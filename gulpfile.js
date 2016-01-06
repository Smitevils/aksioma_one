'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var notify = require("gulp-notify");
var rigger = require('gulp-rigger');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var path = {
  build: {
    html: './dist',
    js: './dist/assets/js',
    style: './dist/assets/css'
  },
  src: {
    html: './html/*.html', 
    js: './js/*.js',
    style: './sass/*.scss'
  },
  watch: {
    html: './html/**/*.html', 
    js: './js/*.js',
    style: './sass/**/*.scss'
  }
};

// Browser Sync
var config = {
  server: {
    baseDir: 'dist'
  },
  tunnel: false,
  host: 'localhost',
  port: 9000,
  logPrefix: 'SmiteVils'
};

gulp.task('webserver', function() {
  browserSync(config);
});

// HTML
gulp.task('html', function() {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

// JS Uglify
gulp.task('compress', function() {
  return gulp.src(path.src.js)
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.build.js));
});

gulp.task('sass', function () {
  gulp.src(path.src.style)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(path.build.style))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.build.style))
    .pipe(reload({stream: true}));
});

gulp.task('notify', function () {
	gulp.src(path.src.style)
	.pipe(notify("Откомпилил и собрал!"));
});

// Watch
gulp.task('watch', function(cb){
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./html/**/*.html', ['html']);
    //gulp.watch('./js/**/*.js', ['compress']);
    //gulp.watch('./**/*', ['notify']);
});

gulp.task('default', ['sass', 'html', 'webserver', 'watch']);