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

const boardFiles = require('../src/board/boards.json');

export default function boards() {
    var pre = [assets({basePath: 'public/', loadPaths: ['static/img/', 'static/fonts/']})];
    var post = [inlineSVG, autoprefixer, fonts];
    var compress = [cssnano];

    gulp.src(PATHS.src.boards)
        .pipe(gulp.dest(PATHS.build.boards));

    gulp.src(PATHS.src.boardsjson)
        .pipe(gulp.dest(PATHS.build.boards));

    return gulp.src(PATHS.src.boardscss)
        .pipe(postcss(pre, {syntax: syntax}))
        .pipe(sassVars(boardFiles, { verbose: false }))
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss(post))
        .pipe(gulp.dest(PATHS.build.boards))
        .pipe(
            gulpif(
				PRODUCTION,
				rename({ suffix: ".min" })
			)
        )
        .pipe(
            gulpif(
				PRODUCTION,
                cleanCSS()
                //postcss(compress)
			)
        )
        .pipe(
            gulpif(
				PRODUCTION,
				gulp.dest(PATHS.build.boards)
			)
        );
}