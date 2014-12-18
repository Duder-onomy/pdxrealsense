'use strict';

var BB = require('bluebird'),
    chalk = require('chalk'),
    childPid,
    childProcess,
    gulp = require('gulp');

gulp.task('start:server', start);

module.exports = {
    start: start,
    stop: stop
};

function start() {
    return new BB.Promise(function (resolve) {
        console.log(chalk.magenta.bold('STARTING'));
        childProcess = require('child_process').fork(__dirname + '/../app');

        childProcess.on('message', function (message) {
            if ('listening' === message.state) {
                console.log(chalk.underline('child process: ' + message.pid));
                console.log(chalk.underline('this process: ' + process.pid));
                childPid = message.pid;
                resolve();
            }
        });

        childProcess.on('exit', function(code) {
            console.log('EXIT CODE', code, 'RECEIVED\n');
            !!code && process.exit(1);
        });
    });
}

function stop() {
    console.log(chalk.red.bold('STOPPING'));
    childProcess.kill('SIGINT');
}
