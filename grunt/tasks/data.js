/*jshint node:true*/
module.exports = function (grunt) {
    'use strict';

    var _ = require('lodash'),
        path = require('path'),
        sep = path.sep,
        databases = require('./../../database/databases');

    grunt.registerTask('data:deleteTemp', function() {
        grunt.file.delete('.data');
    });

    grunt.registerTask('data:load:env', 'Load data from JSON to the server specifying the environmant as an argument.', function(env) {
        grunt.config.set('dbs', ['load']);
        grunt.config.set('environment', env);
        grunt.task.run(['data:load:continue']);
    });
    // Load
    grunt.registerTask('data:load', 'Load the data from JSON to the server. This will wipe out all existing data.',
        function () {
            grunt.config.set('dbs', ['load']);
            grunt.task.run(['prompt:dataLoad', 'data:load:continue']);
        });
    grunt.registerTask('data:load:continue', 'Helper task', function () {
        _.each(grunt.config.get('dbs'), function(db) {
            grunt.task.run('data:load:write:' + db);
        });
    });
    grunt.registerTask('data:load:write', function(action) {
        var tasks = [],
            environment = grunt.config.get('environment');

        grunt.config.set('database', action);
        grunt.config.set('fixtureFolder', getFixtureFolder());
        grunt.config.set('mongo', getMongoConfigs(action));

        _.each(databases[action][environment].collections, function (collection) {
            var filepath = grunt.config.get('fixtureFolder') + '/' + collection,
                arr = [];

            _.each(grunt.file.expand('database' + sep + filepath + sep + '*.json'), function(onePath) {
                arr.push(grunt.file.readJSON(onePath));
            });

            grunt.file.write('.data' + sep + filepath + '.json', JSON.stringify(arr));
            tasks.push('data:set:collection:' + collection);
            tasks.push('shell:mongoImport');
        });

        tasks.push('data:deleteTemp');

        grunt.task.run(tasks);
    });

    // Save
    grunt.registerTask('data:save', 'Save data from the database to JSON.', function () {
        grunt.task.run(['prompt:dataSave', 'clean:database', 'data:save:write']);
    });

    grunt.registerTask('data:save:write', function () {

        var tasks = [],
            action = 'save',
            environment = grunt.config.get('environment');

        grunt.config.set('database', require('./../../app/config/environment/' + environment + '/mongo').database);
        grunt.config.set('fixtureFolder', getFixtureFolder());
        grunt.config.set('mongo', getMongoConfigs(action));

        _.each(databases[action][environment].collections, function (collection) {
            console.log('setting collection to: ' + collection);
            tasks.push('data:set:collection:' + collection);
            tasks.push('shell:mongoExport');
            tasks.push('data:prettify:collection:' + collection);
        });
        grunt.task.run(tasks);

    });

    // Utilities
    grunt.registerTask('data:set:collection', 'Helper task', function (collection) {
        grunt.log.writeln('collection: ' + collection);
        grunt.config.set('collection', collection);
    });
    grunt.registerTask('data:prettify:collection', 'Helper task', function (collection) {
        var filePath = grunt.config.get('fixtureFolder') + '/' + collection,
            collectionData = grunt.file.readJSON('.data' + path.sep + filePath + '.json');

        _.each(collectionData, function(collectionItem) {
            grunt.file.write('database' + path.sep + filePath + path.sep + collectionItem._id.$oid + '.json',
                JSON.stringify(collectionItem, null, 4));
        });

        grunt.file.delete('.data');
    });

    function getFixtureFolder() {
        return require('./../../app/config/environment/' + grunt.config.get('environment') + '/mongo').database;
    }

    function getMongoConfigs(database) {
        var env = grunt.config.get('environment'),
            config = require('../../app/config/environment/' + env + '/mongo');

        console.log('db', database);
        console.log('env', env);
        console.log('config', config);
        return config;
    }
};
