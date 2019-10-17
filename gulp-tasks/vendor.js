const gulp = require('gulp');
const sass = require('gulp-sass');
const syntax = require('postcss-scss');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const assets = require('postcss-assets');
const fonts = require('postcss-font-magician');
const cssnano = require('cssnano');
const inlineSVG = require('postcss-inline-svg');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cached');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

const { PRODUCTION } = require('../config');
const PATHS = require('../paths');

module.exports = function() {
    return gulp.src([
        './node_modules/chessground/dist/*.*'
        ])
        .pipe(gulp.dest(PATHS.build.assets + '/vendor/chessground/'));
}

module.exports.displayName = 'vendor';