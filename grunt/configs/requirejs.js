/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('requirejs', {
        build : {
            options: {
                baseUrl: 'build/client/pdxrealsense',
                mainConfigFile: 'build/client/pdxrealsense/main.js',
                name: 'main',
                out: 'build/client/pdxrealsense/main.js',
                optimize: 'uglify2',
                preserveLicenseComments: false,
                generateSourceMaps:true
                /*include: ['vendor/requirejs/require.js']*/
            }
        }
    });
};
