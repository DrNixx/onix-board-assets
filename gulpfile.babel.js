import gulp from 'gulp';
import clean from './gulp-tasks/clean';
import pieces from './gulp-tasks/pieces';
import boards from './gulp-tasks/boards';

const sass = require("gulp-sass");
const syntax = require('postcss-scss');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const assets = require('postcss-assets')({basePath: 'public/', loadPaths: ['static/img/', 'static/fonts/']});
const fonts = require('postcss-font-magician')();
const cssnano = require('cssnano')();
const inlineSVG = require('postcss-inline-svg')();
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cached');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

const { series, parallel } = require('gulp');

var paths = {
    dest: "./public/assets/",
    build: "./public/assets/",
    produce: "./dist/boards/",
    deploy: "../web/boards/"
};

function vendor() {
    return gulp.src([
        './node_modules/chessground/dist/*.*'
        ], { base: 'node_modules' })
        .pipe(gulp.dest(paths.dest + '/vendor/'));
}

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

let build = series(clean, parallel(common, pieces, boards, vendor));
gulp.task("build", build, function() {
    console.log('Building public...');
});

let produce = series(clean, parallel(common, boards, boards));
gulp.task("produce", produce, function() {
    console.log('Building produce...');
});

let deploy = series(clean, parallel(common, boards, boards));
gulp.task("deploy", deploy, function() {
    console.log('Building deploy...');
});