import { PRODUCTION } from './config';

const base = PRODUCTION ? 'dist' : 'public';

export default {
	build: {
		html: 'build',
		pieces: base + '/assets/pieces/',
		boards: base + '/assets/boards',
		images: 'build/media/img/',
		fonts: 'build/media/fonts/',
		sprites: 'build/media/img/sprites/',
		svg: 'build/media/svg/',
		videos: 'build/media/video/',
	},
	src: {
		templates: './src/templates/',
		nunj: 'src/templates/*.nunj',
		pieces: './src/pieces/**/*.{png,jpg,jpeg,gif,svg}',
		piecescss: ['./src/pieces/*.scss', '!./src/pieces/_*.scss'], 
		boards: './src/board/**/*.{png,jpg,jpeg,gif,svg}',
		boardscss: ['./src/board/*.scss', '!./src/board/_*.scss'],
	},
	clean: base + '/*',
	deploy: '../web/boards/',
};
