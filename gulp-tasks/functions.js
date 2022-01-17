const gulp = require('gulp');
const plugins = require('gulp-load-plugins')({
    rename: {
        'gulp-if': 'gif',
        'gulp-dart-sass': 'sass',
        'gulp-sass-vars': 'sassVars',
        'gulp-nunjucks-api': 'nunjucksRender'
    }
});

const { PRODUCTION } = require('../config');

module.exports.getTask = function (module, task, paths) {
    let taskMoodule = '.';
    if (module) {
        taskMoodule += '/' + module;
    }
    
    taskMoodule += '/' + task;

    return require(taskMoodule)(gulp, plugins, paths, PRODUCTION);
}