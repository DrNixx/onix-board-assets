/// <binding BeforeBuild='sass' AfterBuild='bootstrap-copy' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    rename = require('gulp-rename'),
    sass = require("gulp-sass"),
    cssmin = require("gulp-cssmin");

var paths = {
    webroot: "./public/assets/"
};

var scssFile = 'src/common.scss';

gulp.task("sass", function () {
    return gulp.src(scssFile)
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(paths.webroot + "/css"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.webroot + "/css"));
});
