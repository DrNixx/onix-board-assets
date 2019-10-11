import gulp from 'gulp';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import sassVars from 'gulp-sass-vars';
import syntax from 'postcss-scss';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import assets from 'postcss-assets';
import fonts from 'postcss-font-magician';
import cssnano from 'cssnano';
import inlineSVG from 'postcss-inline-svg';
import sourcemaps from 'gulp-sourcemaps';
import cache from 'gulp-cached';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';

import { PRODUCTION } from '../config';
import PATHS from '../paths';

const config = require('../src/pieces/pieces.json');

export default function pieces() {
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