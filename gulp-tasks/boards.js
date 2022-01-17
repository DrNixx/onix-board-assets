const pipe = require('multipipe');
const assets = require('postcss-assets');
const syntax = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const fonts = require('postcss-font-magician');
const cssnano = require('cssnano');
const inlineSVG = require('postcss-inline-svg');

const boardFiles = require('../src/board/boards.json');

module.exports = function (gulp, plugins, PATHS, PRODUCTION) {
    const task = function () {
        var pre = [assets({basePath: 'public/', loadPaths: ['static/img/', 'static/fonts/']})];
        var post = [inlineSVG, autoprefixer, fonts];
        var compress = [cssnano];

        gulp.src(PATHS.src.boards)
            .pipe(gulp.dest(PATHS.build.boards));

        gulp.src(PATHS.src.boardsjson)
            .pipe(gulp.dest(PATHS.build.scripts));

        return gulp.src(PATHS.src.boardscss)
            .pipe(plugins.postcss(pre, {syntax: syntax}))
            .pipe(plugins.sassVars(boardFiles, { verbose: false }))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass({
                includePaths: ['node_modules/breakpoint-sass/stylesheets/breakpoint'],
            }).on('error', plugins.sass.logError))
            .pipe(plugins.postcss(post))
            .pipe(
                plugins.gif(
                    PRODUCTION,
                    plugins.sourcemaps.write('.')
                )
            )
            .pipe(gulp.dest(PATHS.build.boards))
            .pipe(
                plugins.gif(
                    PRODUCTION,
                    pipe(
                        plugins.filter('**/*.css'),
                        plugins.postcss(compress),
                        plugins.rename({ suffix: '.min' }),
                        gulp.dest(PATHS.build.boards)
                    )
                )
            );
    };

    task.displayName = 'boards';

    return task;
};
