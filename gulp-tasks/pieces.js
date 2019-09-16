import gulp from 'gulp';
import sass from 'gulp-sass';
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

export default function pieces() {
    var pre = [assets({basePath: 'public/', loadPaths: ['static/img/', 'static/fonts/']})];
    var post = [inlineSVG, autoprefixer, fonts];
    var compress = [cssnano];

    gulp.src(PATHS.src.pieces)
        .pipe(gulp.dest(PATHS.build.pieces));

    gulp.src(PATHS.src.piecesjson)
        .pipe(gulp.dest(PATHS.build.pieces));

    return gulp.src(PATHS.src.piecescss)
        .pipe(postcss(pre, {syntax: syntax}))
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss(post))
        .pipe(gulp.dest(PATHS.build.pieces))
        .pipe(rename({ suffix: ".min" }))
        //.pipe(postcss(compress))
        .pipe(cleanCSS())
        .pipe(gulp.dest(PATHS.build.pieces)); 
}