module.exports = function (grunt) {
    'use strict';

    var fs = require('fs');

    grunt.registerTask('deploy', function () {

        var tasks = [
            'prompt:deploy',
            'ensureChosenEnvHasConfigs',
            'ensureMongoCredentials',
            'build',
            'templateConfigsFromEnv',
            'copy:rootFilesToBuild',
            'fixRequirePaths',
            'buildGhPages:staging',
            'deployToHerokuIfEnvIsStaging'
        ];

        grunt.task.run(tasks);
    });

    grunt.registerTask('ensureChosenEnvHasConfigs', 'Ensure that configs are present for the environment you chose', function() {
        var chosenConfigPath = 'app/config/environment/' + grunt.config.get('environment');

        if(!grunt.file.isDir(chosenConfigPath)) {
            grunt.fail.warn('You need to make configs for this environment :'+ grunt.config.get('environment'));
        } else {
            if(!grunt.file.exists(chosenConfigPath + '/app.json')) {
                grunt.fail.warn('You are missing an app.json config for this environment :'+ grunt.config.get('environment'));
                return;
            }
            if(!grunt.file.exists(chosenConfigPath + '/grasshopper.json')) {
                grunt.fail.warn('You are missing an grasshopper.json config for this environment :'+ grunt.config.get('environment'));
                return;
            }
            if(!grunt.file.exists(chosenConfigPath + '/logger.json')) {
                grunt.fail.warn('You are missing an logger.json config for this environment :'+ grunt.config.get('environment'));
                return;
            }
            if(!grunt.file.exists(chosenConfigPath + '/mongo.json')) {
                grunt.fail.warn('You are missing an mongo.json config for this environment :'+ grunt.config.get('environment'));
                return;
            }
        }
    });

    grunt.registerTask('ensureMongoCredentials', 'if deploying to staging or production, prompt for mongo username and password if those values are false on the config', function() {
        var mongoConfig = _getMongoConfigFromApp();

        if(!mongoConfig.username) {
            grunt.task.run('prompt:mongoUsername');
        }

        if(!mongoConfig.password) {
            grunt.task.run('prompt:mongoPassword');
        }
    });

    grunt.registerTask('templateConfigsFromEnv', 'Template configs from env vars, things like mongo username and password.', function() {
        var mongoConfig = _getMongoConfigFromBuild();

        if(!mongoConfig.username) {
            mongoConfig.username = grunt.config.get('mongo').username;
        }

        if(!mongoConfig.password) {
            mongoConfig.password = grunt.config.get('mongo').password;
        }

        _writeMongoConfigTooBuild(JSON.stringify(mongoConfig, null, 4));
    });

    grunt.registerTask('fixRequirePaths', 'certain paths get screwed from moving this around. fix those', function() {
        var requirePaths = require('../../build/require-paths.json');

        requirePaths.pkg = 'package.json';

        fs.writeFileSync('build/require-paths.json', JSON.stringify(requirePaths, null, 4));
    });

    grunt.registerTask('deployToHerokuIfEnvIsStaging', '', function() {
        if(grunt.config.get('environment') === 'staging') {
            grunt.task.run('shell:deployStagingToHeroku');
        }
    });

    function _getMongoConfigFromApp() {
        return require('./../../app/config/environment/' + grunt.config.get('environment') + '/mongo');
    }

    function _getMongoConfigFromBuild() {
        return require('./../../build/config/environment/' + grunt.config.get('environment') + '/mongo');
    }

    function _writeMongoConfigTooBuild(config) {
        grunt.file.write('build/config/environment/' + grunt.config.get('environment') + '/mongo.json', config, { force : true });
    }
};
