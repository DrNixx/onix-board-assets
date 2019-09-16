import { PRODUCTION } from './config';

const base = PRODUCTION ? 'dist' : 'public';
const assets = base + '/assets'

export default {
	build: {
		html: base,
		assets: assets,
		pieces: assets + '/pieces/',
		boards: assets + '/boards',
		images: base + '/media/img/',
		fonts: base + '/media/fonts/',
		sprites: base + '/media/img/sprites/',
		svg: base + '/media/svg/',
		videos: base + '/media/video/',
	},
	src: {
		templates: './src/templates/',
		nunj: 'src/templates/*.nunj',
		pieces: './src/pieces/**/*.{png,jpg,jpeg,gif,svg}',
		piecesjson: './src/pieces/pieces.json',
		piecescss: ['./src/pieces/*.scss', '!./src/pieces/_*.scss'], 
		boards: './src/board/**/*.{png,jpg,jpeg,gif,svg}',
		boardsjson: './src/board/boards.json',
		boardscss: ['./src/board/*.scss', '!./src/board/_*.scss'],
	},
	clean: base + '/*',
	deploy: '../web/boards/',
};
