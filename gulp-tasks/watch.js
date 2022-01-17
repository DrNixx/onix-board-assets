const gulpWatch = require('gulp-watch');
const getTask = require('./functions').getTask;

const PATHS_OPTIONS = require('../paths');

const html = getTask('', 'html', PATHS_OPTIONS);
const pieces = getTask('', 'pieces', PATHS_OPTIONS);
const boards = getTask('', 'boards', PATHS_OPTIONS);
const common = getTask('', 'common', PATHS_OPTIONS);

module.exports = function() {
	gulpWatch([PATHS.watch.nunj], html);
	gulpWatch([PATHS.watch.pieces], pieces);
	gulpWatch([PATHS.watch.boards], boards);
	gulpWatch([PATHS.watch.common], common);
}

module.exports.displayName = 'watch';