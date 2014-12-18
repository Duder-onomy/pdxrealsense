'use strict';

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    watch = require('gulp-watch');

gulp.task('jade', function() {
    gulp.src('./app/client/pdxrealsense/**/*.jade')
        .pipe(watch('./app/client/pdxrealsense/**/*.jade'))
        .pipe(jade())
        .pipe(gulp.dest('./app/client/pdxrealsense/'));
});
