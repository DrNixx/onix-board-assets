"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    rename = require('gulp-rename'),
    sass = require("gulp-sass"),
    cssmin = require("gulp-cssmin"),
    del = require('del');;

var paths = {
    dest: "./public/assets/",
    build: "./public/assets/",
    produce: "./dist/boards/",
    deploy: "../web/boards/"
};

gulp.task('build:public', function() {
  paths.dest = paths.build;
});

gulp.task('build:produce', function() {
  paths.dest = paths.produce;
});

gulp.task('build:deploy', function() {
  paths.dest = paths.deploy;
});

gulp.task('clean', function() {
  return del.sync(paths.dest, {force: true});
});

gulp.task("bg", function() {
    gulp.src('./src/bg/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(gulp.dest(paths.dest + '/bg'));

    return gulp.src(['./src/bg/*.scss', '!./src/bg/_*.scss'])
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(paths.dest + '/bg'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.dest + '/bg')); 
});

gulp.task("pieces", function() {
    gulp.src('./src/pieces/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(gulp.dest(paths.dest + '/pieces'));

    return gulp.src(['./src/pieces/*.scss', '!./src/pieces/_*.scss'])
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(paths.dest + '/pieces'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.dest + '/pieces')); 
});

gulp.task("squares", function() {
    gulp.src('./src/squares/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(gulp.dest(paths.dest + '/squares'));

    return gulp.src(['./src/squares/*.scss', '!./src/squares/_*.scss'])
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(paths.dest + '/squares'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.dest + '/squares')); 
});

gulp.task("common", function () {
    return gulp.src('./src/common.scss')
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(paths.dest))
        .pipe(rename({ suffix: ".min" }))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.dest));
});

gulp.task("build", ['build:public', 'clean', 'common', 'pieces', 'squares', 'bg'], function() {
    console.log('Building public...');
});

gulp.task("produce", ['build:produce', 'clean', 'common', 'pieces', 'squares', 'bg'], function() {
    console.log('Building produce...');
});

gulp.task("deploy", ['build:deploy', 'clean', 'common', 'pieces', 'squares', 'bg'], function() {
    console.log('Building deploy...');
});