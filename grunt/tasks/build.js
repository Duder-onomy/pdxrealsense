/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    var _ = require('lodash'),
        path = require('path');

    grunt.registerTask('build', [
        'ensureUserHasEnteredEnv',
        'clean:build',
        'shell:installDependencies',
        'copy:build',
        'jade',
        'sass',
        'autoprefixer',
        'requirejs',
        'clean:unUsedFilesFromBuild',
        'removeNonNeededConfigsFromBuild'

        /*'useminPrepare',*/
        /*'imagemin',*/
        /*'filerev',*/
        /*'usemin',*/
        /*'clean:temp'*/

    ]);

    grunt.registerTask('ensureUserHasEnteredEnv', 'If user has not entered the build env, then ask for it.', function() {
        if(!grunt.config.get('environment')) {
            grunt.task.run('prompt:build');
        }
    });

    grunt.registerTask('removeNonNeededConfigsFromBuild', 'Removes all configs that you are not using for the chosen environment', function() {
        var dirsToDelete = [];

        grunt.file.recurse('build/config/environment', function(abspath, rootdir, subdir, filename) {
            if(subdir !== grunt.config.get('environment')) {
                dirsToDelete.push(path.join(rootdir, subdir));
            }
        });

        _.each(_.uniq(dirsToDelete), function(dir) {
            grunt.file.delete(dir);
        });
    });
};
