'use strict';

var BB = require('bluebird'),
    dir = __dirname,
    environment = process.env.ENVIRONMENT || 'local',
    glob = require('glob'),
    globOptions = {
        cwd: dir
    },
    path = require('path'),
    ral = require('ral');

module.exports = {
    initialize: initialize
};

function initialize() {

    return BB.resolve()
        .bind(this)
        .then(addRawConfigs)
        .then(addSharedConfigs);
}

function addRawConfigs() {

    var config = this;

    return new BB(function(resolve, reject) {
        glob('environment/' + environment + '/*.json', globOptions, function(err, files) {
            if (err) {
                reject();
                return;
            }

            config = files
                .reduce(function(config, filePath) {
                    config[path.basename(filePath, '.json')] = ral('config/' + filePath);

                    return config;
                }, config);

            resolve();
        });
    });
}

function addSharedConfigs() {

    var config = this;

    return new BB(function(resolve, reject) {
        glob('shared/*.js', globOptions, function(err, files) {
            if (err) {
                reject();
                return;
            }

            files
                .map(function(templatePath) {
                    return 'config/' + templatePath;
                })
                .map(function(templatePath) {
                    ral(templatePath)(config);
                });

            resolve();
        });
    });
}
