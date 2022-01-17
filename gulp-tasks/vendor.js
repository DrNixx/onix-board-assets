module.exports = function (gulp, plugins, PATHS, PRODUCTION) {
    const task = function () {
        return gulp.src([
            './src/vendor/chessground/js/chessground.js'
        ])
        .pipe(gulp.dest(PATHS.build.assets + '/vendor/chessground/'));
    };

    task.displayName = 'vendor';
    return task;
};