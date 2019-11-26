const gulp = require('gulp');
const clean = require('./gulp-tasks/clean');
const common = require('./gulp-tasks/common');
const pieces = require('./gulp-tasks/pieces');
const boards = require('./gulp-tasks/boards');
const html = require('./gulp-tasks/html');
const vendor = require('./gulp-tasks/vendor');
const scripts = require('./gulp-tasks/scripts');
const webpack = require('./gulp-tasks/webpack');
const watch = require('./gulp-tasks/watch');
const server = require('./gulp-tasks/server');

const { series, parallel } = require('gulp');

let build = series(clean, parallel(common, pieces, boards, vendor, html));
gulp.task("build", build, function() {
    console.log('Building public...');
});

let produce = series(clean, parallel(common, pieces, boards, scripts));
gulp.task("produce", produce, function() {
    console.log('Building produce...');
});

gulp.task('default', parallel('build', watch, server));