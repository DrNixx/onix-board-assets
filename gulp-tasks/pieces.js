const pipe = require('multipipe');
const assets = require('postcss-assets');
const syntax = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const fonts = require('postcss-font-magician');
const cssnano = require('cssnano');
const inlineSVG = require('postcss-inline-svg');

const config = require('../src/pieces/pieces.json');

module.exports = function (gulp, plugins, PATHS, PRODUCTION) {
    const task = function () {
        var pre = [assets({basePath: 'public/', loadPaths: ['static/img/', 'static/fonts/']})];
        var post = [inlineSVG, autoprefixer, fonts];
        var compress = [cssnano];

        /* copy graphics */
        gulp.src(PATHS.src.pieces)
            .pipe(gulp.dest(PATHS.build.pieces));

        /* compile single pieces */
        config.pieceFaces.forEach(face => {
            gulp.src(PATHS.src.piecesroot + "item.scss")
                .pipe(plugins.postcss(pre, {syntax: syntax}))
                .pipe(plugins.sassVars(face, { verbose: false }))
                .pipe(plugins.sass().on("error", plugins.sass.logError))
                .pipe(plugins.postcss(post))
                .pipe(plugins.rename(face.code + ".css"))
                .pipe(
                    plugins.gif(
                        PRODUCTION,
                        plugins.sourcemaps.write('.')
                    )
                )
                .pipe(gulp.dest(PATHS.build.pieces))
                .pipe(
                    plugins.gif(
                        PRODUCTION,
                        pipe(
                            plugins.filter('**/*.css'),
                            plugins.postcss(compress),
                            plugins.rename({ suffix: '.min' }),
                            gulp.dest(PATHS.build.pieces)
                        )
                    )
                );
        });

        /* compile single file */
        gulp.src(PATHS.src.piecesroot + "external.scss")
            .pipe(plugins.postcss(pre, {syntax: syntax}))
            .pipe(plugins.sassVars(config, { verbose: false }))
            .pipe(plugins.sass().on("error", plugins.sass.logError))
            .pipe(plugins.postcss(post))
            .pipe(
                plugins.gif(
                    PRODUCTION,
                    plugins.sourcemaps.write('.')
                )
            )
            .pipe(gulp.dest(PATHS.build.pieces))
            .pipe(
                plugins.gif(
                    PRODUCTION,
                    pipe(
                        plugins.filter('**/*.css'),
                        plugins.postcss(compress),
                        plugins.rename({ suffix: '.min' }),
                        gulp.dest(PATHS.build.pieces)
                    )
                )
            );

        return gulp.src(PATHS.src.piecesjson)
            .pipe(gulp.dest(PATHS.build.scripts));
    };

    task.displayName = 'pieces';
    return task;
};
