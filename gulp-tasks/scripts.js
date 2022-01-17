const merge = require('merge2');

module.exports = function (gulp, plugins, PATHS, PRODUCTION) {
    const task = function () {
        const tsProj = plugins.typescript.createProject('tsconfig.json');
        const reporter = plugins.typescript.reporter.fullReporter();

        const tsResult = gulp.src(['src/js/**/*.ts', 'src/js/**/*.tsx'])
            .pipe(plugins.sourcemaps.init())
            .pipe(tsProj(reporter));

        return merge([
            tsResult.dts
                .pipe(gulp.dest(PATHS.build.scripts)),
            tsResult.js
                .pipe(plugins.sourcemaps.write('.'))
                .pipe(gulp.dest(PATHS.build.scripts))
        ]);
    };

    task.displayName = 'scripts';

    return task;
};