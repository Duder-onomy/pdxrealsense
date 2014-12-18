'use strict';

var gulp = require('gulp'),
    server = require('./server'),
    watch = require('gulp-watch');

gulp.task('watch:server', function () {
    gulp
        .watch([
            'app/**/*.js',
            '!app/client/**/*.js',
            'app/require-paths.json'
        ],
        {
            cwd: __dirname + '/..'
        },
        ['lint:server'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            server.stop();
            server.start();
        });
});

gulp.task('watch:client', function () {
    gulp
        .watch([
            'app/client/**/*.js',
            '!app/client/admin/**/*.js',
            '!app/client/vendor/**/*.js'
        ],
        {
            cwd: __dirname + '/..'
        },
        ['lint:client']);
});

gulp.task('watch:sass', function() {
    watch('./app/client/pdxrealsense/**/*.scss', function() {
        gulp.start('sass');
    });
});
