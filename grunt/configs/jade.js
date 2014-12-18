/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('jade', {
        build: {
            options: {},
            files: [{
                cwd : 'build/client/pdxrealsense',
                src : '**/*.jade',
                dest : 'build/client/pdxrealsense',
                expand : true,
                ext : '.html'
            }]
        }
    });
};
