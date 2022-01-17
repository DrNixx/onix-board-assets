const log = require('fancy-log');
const notifier = require('node-notifier');

const extensions = require('../src/templates/lib/extensions.js');
const filters = require('../src/templates/lib/filters.js');
const functions = require('../src/templates/lib/functions.js');

const globalData = require('../global-data.json');
const pieces = require('../src/pieces/pieces.json');

module.exports.displayName = 'html';

module.exports = function (gulp, plugins, PATHS, PRODUCTION) {
    const task = function () {
        return gulp
		.src(PATHS.src.nunj)
		.pipe(
			plugins.plumber({
				errorHandler: function(err) {
					log(err.message);
					notifier.notify({
						title: 'Nunjucks compilation error',
						message: err.message,
					});
				},
			})
		)
		.pipe(
			plugins.nunjucksRender({
				src: PATHS.src.templates,
				data: Object.assign(
					{
						DEVELOP: !PRODUCTION,
					},
					globalData,
					pieces
				),
				extensions,
				filters,
				functions,
				trimBlocks: true,
				lstripBlocks: true,
				autoescape: false,
			})
		)
		.pipe(
			plugins.gif(
				PRODUCTION,
				plugins.jsbeautifier({
					max_preserve_newlines: 1,
					wrap_line_length: 0,
				})
			)
		)
		.pipe(gulp.dest(PATHS.build.html));
    };

    task.displayName = 'html';

    return task;
};