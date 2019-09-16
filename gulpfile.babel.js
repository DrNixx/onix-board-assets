import gulp from 'gulp';
import clean from './gulp-tasks/clean';
import pieces from './gulp-tasks/pieces';
import boards from './gulp-tasks/boards';
import html from './gulp-tasks/html';
import vendor from './gulp-tasks/vendor';

const { series, parallel } = require('gulp');

let build = series(clean, parallel(pieces, boards, vendor, html));
gulp.task("build", build, function() {
    console.log('Building public...');
});

let produce = series(clean, parallel(pieces, boards));
gulp.task("produce", produce, function() {
    console.log('Building produce...');
});

let deploy = series(clean, parallel(pieces, boards));
gulp.task("deploy", deploy, function() {
    console.log('Building deploy...');
});