/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('copy', {
        build : {
            files : [
                {
                    expand : true,
                    cwd : 'app/',
                    src : [
                        '**'
                    ],
                    dest : 'build/'
                }
            ]
        },
        rootFilesToBuild : {
            files : [
                {
                    expand : true,
                    cwd : './',
                    src : [
                        'package.json'
                    ],
                    dest : 'build/'
                }
            ]
        }
    });
};
