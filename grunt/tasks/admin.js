/*jshint node:true */
'use strict';

module.exports = function(grunt) {

    grunt.registerTask('admin:build', function() {
        var config = {};
        require('../../app/config/shared/gha')(config);

        process.env.GRASSHOPPER_ADMIN_CONFIG = JSON.stringify(config.gha);
        grunt.task.run(['shell:admin']);
    });
};
