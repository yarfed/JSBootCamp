/**
 * Created by User on 26.04.2016.
 */
'use strict';
const gulp = require('gulp');
const del = require('del');
var htmlmin = require('gulp-html-minifier');
var cleanCSS = require('gulp-clean-css');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

gulp.task('copy:css', function () {
    return gulp.src('src/**/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('build'));
});

gulp.task('copy:html', function () {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build'));
});

gulp.task('copy:js', function () {
    return gulp.src(['src/**/*.js','!src/lib/*.js'])
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task('copy:lib', function () {
    return gulp.src('src/lib/*.js')
        .pipe(gulp.dest('build/lib'));
});

gulp.task('clean', function () {
    return del('build');
});

gulp.task('default', gulp.series('clean', gulp.parallel('copy:html','copy:css','copy:js','copy:lib')));