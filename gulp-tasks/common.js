const pipe = require('multipipe');
const assets = require('postcss-assets');
const syntax = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const fonts = require('postcss-font-magician');
const cssnano = require('cssnano');
const inlineSVG = require('postcss-inline-svg');

const boardFiles = require('../src/board/boards.json');

function sassFunctions(options) {
    options = options || {};
    options.base = options.base || process.cwd();
  
    var fs         = require('fs');
    var path       = require('path');
    var SassString = require('sass').SassString;
    var mime       = require('mime');
  
    mime.define( {"image/x-icon": ["cur", "*ico"]} );

    var funcs = {};
  
    funcs['inline-image($file)'] = function(file) {
        var file = path.resolve(options.base, file.getValue());
        var fileMime = mime.getType(file);
        var data = fs.readFileSync(file);
        var buffer = Buffer.from(data);
        var str = buffer.toString('base64');
        str = 'url("data:' + fileMime  + ';base64,' + str +'")';
        return new SassString(str);
    };
  
    return funcs;
}

module.exports = function (gulp, plugins, PATHS, PRODUCTION) {
    const task = function () {
        var pre = [assets({basePath: 'public/', loadPaths: ['static/img/', 'static/fonts/']})];
        var post = [inlineSVG, autoprefixer, fonts];
        var compress = [cssnano];

        return gulp.src(PATHS.src.common)
            .pipe(plugins.postcss(pre, {syntax: syntax}))
            .pipe(plugins.sassVars(boardFiles, { verbose: false }))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass({
                includePaths: ['node_modules/breakpoint-sass/stylesheets/breakpoint'],
                functions: sassFunctions({ base: PATHS.src.commondir })
            }).on('error', plugins.sass.logError))
            .pipe(plugins.postcss(post))
            .pipe(
                plugins.gif(
                    PRODUCTION,
                    plugins.sourcemaps.write('.')
                )
            )
            .pipe(gulp.dest(PATHS.build.assets))
            .pipe(
                plugins.gif(
                    PRODUCTION,
                    pipe(
                        plugins.filter('**/*.css'),
                        plugins.postcss(compress),
                        plugins.rename({ suffix: '.min' }),
                        gulp.dest(PATHS.build.assets)
                    )
                )
            );
    };

    task.displayName = 'common';

    return task;
};