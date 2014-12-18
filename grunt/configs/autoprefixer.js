/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('autoprefixer', {
        no_dest: {
            src: 'build/client/pdxrealsense/styles/main.css'
        }
    });
};
