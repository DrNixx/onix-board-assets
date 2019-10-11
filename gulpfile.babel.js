import gulp from 'gulp';
import clean from './gulp-tasks/clean';
import common from './gulp-tasks/common';
import pieces from './gulp-tasks/pieces';
import boards from './gulp-tasks/boards';
import html from './gulp-tasks/html';
import vendor from './gulp-tasks/vendor';
import watch from './gulp-tasks/watch';
import server from './gulp-tasks/server';

const { series, parallel } = require('gulp');

let build = series(clean, parallel(common, pieces, boards, vendor, html));
gulp.task("build", build, function() {
    console.log('Building public...');
});

let produce = series(clean, parallel(common, pieces, boards));
gulp.task("produce", produce, function() {
    console.log('Building produce...');
});

let deploy = series(clean, parallel(common, pieces, boards));
gulp.task("deploy", deploy, function() {
    console.log('Building deploy...');
});

gulp.task('default', parallel('build', watch, server));