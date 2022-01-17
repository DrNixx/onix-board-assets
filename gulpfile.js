const gulp = require('gulp');
const { series, parallel } = require('gulp');

const webpack = require('./gulp-tasks/webpack');
const watch = require('./gulp-tasks/watch');
const server = require('./gulp-tasks/server');

const getTask = require('./gulp-tasks/functions').getTask;

const PATHS_OPTIONS = require('./paths');

const clean = getTask('', 'clean', PATHS_OPTIONS);
const common = getTask('', 'common', PATHS_OPTIONS);
const boards = getTask('', 'boards', PATHS_OPTIONS);
const pieces = getTask('', 'pieces', PATHS_OPTIONS);
const scripts = getTask('', 'scripts', PATHS_OPTIONS);
const html = getTask('', 'html', PATHS_OPTIONS);
const vendor = getTask('', 'vendor', PATHS_OPTIONS);


let build = series(clean, parallel(common, pieces, boards, vendor, html));
gulp.task("build", build, function() {
    console.log('Building public...');
});

let produce = series(clean, parallel(common, pieces, boards, scripts));
gulp.task("produce", produce, function() {
    console.log('Building produce...');
});

gulp.task('default', parallel('build', watch, server));