'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var kit = require('gulp-kit');
var browserSync = require('browser-sync').create();
var prettify = require('gulp-prettify');

gulp.task('serve', ['sass', 'kit', 'prettify'], function () {

    browserSync.init({
        server: {
            baseDir: ".",
            index: "index.html"
        }
    });

    gulp.watch('./scss/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('./kit/**/*.kit', ['kit']).on('change', browserSync.reload);
    gulp.watch('./src/**/*.html', ['prettify']).on('change', browserSync.reload);
});


gulp.task('sass', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'iOS >= 8'], cascade: false}))
        .pipe(gulp.dest('./css'))
});


gulp.task('kit', function () {
    return gulp
        .src('./kit/*.kit')
        .pipe(kit())
        .pipe(gulp.dest('./src/'))
});

gulp.task('prettify', function () {
    return gulp
        .src('./src/*.html')
        .pipe(prettify({
            indent_size: 1,
            preserve_newlines: true,
            indent_with_tabs: true,
            end_with_newline: true,
            max_preserve_newlines: 0,
            brace_style: 'expand'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./kit/**/*.kit', ['kit']);

});

gulp.task('default', ['serve']);
