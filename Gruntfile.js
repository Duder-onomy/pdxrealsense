'use strict';

module.exports = function (grunt) {

    var defaultEnvironment = 'local';

    // Project configuration.
    grunt.initConfig({
        urlToOpen : '',
        pkg : grunt.file.readJSON('package.json'),
        warning : { readme : 'Compiled file. Do not edit directly. '},
        environment : defaultEnvironment
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadTasks('grunt/configs');
    grunt.loadTasks('grunt/tasks');
};
