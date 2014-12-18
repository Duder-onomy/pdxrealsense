'use strict';

var gulp = require('gulp'),
    taskListing = require('gulp-task-listing');

gulp.task('help', taskListing);

require('./gulp/jade');
require('./gulp/lint');
require('./gulp/sass');
require('./gulp/watch');

gulp.task('default', [
    'start:server',
    'lint:server', 'lint:client',
    'jade', 'sass',
    'watch:server', 'watch:client', 'watch:sass'
]);
