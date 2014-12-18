/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('sass', {
        build : {
            files : {
                'build/client/pdxrealsense/styles/main.css' : 'build/client/pdxrealsense/styles/main.scss'
            }
        }
    });
};
