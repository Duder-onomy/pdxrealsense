/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('buildGhPages', {
        staging : {
            options: {
                build_branch: "staging",
                dist: "build",
                pull: true
            }
        }
    });

};
