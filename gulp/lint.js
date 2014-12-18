'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

gulp.task('lint:server', function () {
    return gulp.src([
            'app/**/*.js',
            '!app/client/**/*.js'
        ],
        {
            cwd: __dirname + '/..'
        })
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('lint:client', function () {
    return gulp.src([
            'app/client/**/*.js',
            '!app/client/admin/**/*.js',
            '!app/client/vendor/**/*.js'
        ],
        {
            cwd: __dirname + '/..'
        })
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});
