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

const boardFiles = require('../src/board/boards.json');

function sassFunctions(options) {
    options = options || {};
    options.base = options.base || process.cwd();
  
    var fs        = require('fs');
    var path      = require('path');
    var types     = require('node-sass').types;
    var mime    = require('mime');
  
    mime.define( {"image/x-icon": ["cur", "*ico"]} );

    var funcs = {};
  
    funcs['inline-image($file)'] = function(file) {
        var file = path.resolve(options.base, file.getValue());
        var fileMime = mime.getType(file);
        var data = fs.readFileSync(file);
        var buffer = Buffer.from(data);
        var str = buffer.toString('base64');
        str = 'url("data:' + fileMime  + ';base64,' + str +'")';
        return types.String(str);
    };
  
    return funcs;
}

module.exports = function() {
    var pre = [assets({basePath: 'public/', loadPaths: ['static/img/', 'static/fonts/']})];
    var post = [inlineSVG, autoprefixer, fonts];
    var compress = [cssnano];

    return gulp.src(PATHS.src.common)
        .pipe(postcss(pre, {syntax: syntax}))
        .pipe(sassVars(boardFiles, { verbose: false }))
        .pipe(sass({ 
            functions: sassFunctions({ base: PATHS.src.commondir }) 
        }).on("error", sass.logError))
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

module.exports.displayName = 'common';