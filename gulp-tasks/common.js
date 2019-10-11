import gulp from 'gulp';
import gulpif from 'gulp-if';
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

export default function common() {
    var pre = [assets({basePath: 'public/', loadPaths: ['static/img/', 'static/fonts/']})];
    var post = [inlineSVG, autoprefixer, fonts];
    var compress = [cssnano];

    return gulp.src(PATHS.src.common)
        .pipe(postcss(pre, {syntax: syntax}))
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss(post))
        .pipe(gulp.dest(PATHS.build.assets))
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
				gulp.dest(PATHS.build.assets)
			)
        ); 
}