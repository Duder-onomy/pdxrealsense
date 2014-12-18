'use strict';

module.exports = function (grunt) {
    grunt.config('clean', {
        database : ['database/pdxrealsense'],
        build : ['build'],
        unUsedFilesFromBuild : [
            'build/client/pdxrealsense/api',
            'build/client/pdxrealsense/routers',
            'build/client/pdxrealsense/views',
            'build/client/pdxrealsense/styles/**/*.scss',
            'build/client/pdxrealsense/constants.js',
            'build/client/pdxrealsense/resources.js',
            'build/client/shared',
            'build/client/utilities'
        ]
    });
};
