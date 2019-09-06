"use strict";

const gulp = require('gulp');

const { series, parallel } = require('gulp'),
    rename = require('gulp-rename'),
    sass = require("gulp-sass"),
    cleanCSS = require('gulp-clean-css'),
    del = require('del');;

var paths = {
    dest: "./public/assets/",
    build: "./public/assets/",
    produce: "./dist/boards/",
    deploy: "../web/boards/"
};

function set_public(cb) {
  paths.dest = paths.build;
  cb();
};

function set_produce(cb) {
  paths.dest = paths.produce;
  cb();
};

function set_deploy(cb) {
  paths.dest = paths.deploy;
  cb();
};

function clean(cb) {
  del.sync(paths.dest, {force: true});
  cb();
};

function bg() {
    gulp.src('./src/bg/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(gulp.dest(paths.dest + '/bg'));

    return gulp.src(['./src/bg/*.scss', '!./src/bg/_*.scss'])
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(paths.dest + '/bg'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.dest + '/bg')); 
};

function pieces() {
    gulp.src('./src/pieces/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(gulp.dest(paths.dest + '/pieces'));

    return gulp.src(['./src/pieces/*.scss', '!./src/pieces/_*.scss'])
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(paths.dest + '/pieces'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.dest + '/pieces')); 
};

function squares() {
    gulp.src('./src/squares/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(gulp.dest(paths.dest + '/squares'));

    return gulp.src(['./src/squares/*.scss', '!./src/squares/_*.scss'])
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(paths.dest + '/squares'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.dest + '/squares')); 
};

function common() {
    return gulp.src('./src/common.scss')
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(paths.dest))
        .pipe(rename({ suffix: ".min" }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.dest));
};

let build = series(set_public, clean, parallel(common, pieces, squares, bg));
gulp.task("build", build, function() {
    console.log('Building public...');
});

let produce = series(set_produce, clean, parallel(common, pieces, squares, bg));
gulp.task("produce", produce, function() {
    console.log('Building produce...');
});

let deploy = series(set_deploy, clean, parallel(common, pieces, squares, bg));
gulp.task("deploy", deploy, function() {
    console.log('Building deploy...');
});