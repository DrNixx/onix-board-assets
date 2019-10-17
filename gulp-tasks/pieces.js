const gulp = require('gulp');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const sassVars = require('gulp-sass-vars');
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

const config = require('../src/pieces/pieces.json');

module.exports = function() {
    var pre = [assets({basePath: 'public/', loadPaths: ['static/img/', 'static/fonts/']})];
    var post = [inlineSVG, autoprefixer, fonts];
    var compress = [cssnano];

    /* copy graphics */
    gulp.src(PATHS.src.pieces)
        .pipe(gulp.dest(PATHS.build.pieces));
    
    /* compile single pieces */
    config.pieceFaces.forEach(face => {
        gulp.src(PATHS.src.piecesroot + "item.scss")
            .pipe(postcss(pre, {syntax: syntax}))
            .pipe(sassVars(face, { verbose: false }))
            .pipe(sass().on("error", sass.logError))
            .pipe(postcss(post))
            .pipe(rename(face.code + ".css"))
            .pipe(gulp.dest(PATHS.build.pieces))
            .pipe(gulpif(PRODUCTION, rename({ suffix: ".min" })))
            .pipe(gulpif(PRODUCTION, cleanCSS()))
            //.pipe(gulpif(PRODUCTION, postcss(compress)))
            .pipe(gulpif(PRODUCTION,gulp.dest(PATHS.build.pieces)));
    });

    /* compile single file */
    gulp.src(PATHS.src.piecesroot + "external.scss")
        .pipe(postcss(pre, {syntax: syntax}))
        .pipe(sassVars(config, { verbose: false }))
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss(post))
        .pipe(gulp.dest(PATHS.build.pieces))
        .pipe(gulpif(PRODUCTION, rename({ suffix: ".min" })))
        .pipe(gulpif(PRODUCTION, cleanCSS()))
        //.pipe(gulpif(PRODUCTION, postcss(compress)))
        .pipe(gulpif(PRODUCTION,gulp.dest(PATHS.build.pieces)));

    return gulp.src(PATHS.src.piecesjson)
        .pipe(gulp.dest(PATHS.build.pieces));
}

module.exports.displayName = 'pieces';