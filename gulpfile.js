'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: {
            baseDir: ".",
            index: "src/index.html"
        }
    });

    gulp.watch('./scss/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('./src/**/*.html').on('change', browserSync.reload);
});


gulp.task('sass', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'iOS >= 8'], cascade: false}))
        .pipe(gulp.dest('./css'))
});


gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', ['serve']);
