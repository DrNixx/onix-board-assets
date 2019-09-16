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

export default function vendor() {
    return gulp.src([
        './node_modules/chessground/dist/*.*'
        ])
        .pipe(gulp.dest(PATHS.build.assets + '/vendor/chessground/'));
}