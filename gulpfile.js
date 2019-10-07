/**
* Imports
*/
const { src, dest, series, watch } = require( 'gulp' ),
	sass			= require( 'gulp-sass' ),
	notify			= require( 'gulp-notify' ),
	minifycss		= require( 'gulp-clean-css' ),
	concat			= require( 'gulp-concat' ),
	uglify			= require( 'gulp-uglify' ),
	inline			= require( 'gulp-inline' ),
	entities		= require( 'gulp-html-entities' ),
	nunjucksRender	= require( 'gulp-nunjucks-render' );

/**
* Paths
*/
const paths = {
	scss: 	[ 'assets/scss/*' ],
	js: 	[ 'assets/js/*' ],
	source: [ 'source/**/*' ]
}

/**
* Process SASS and output to style.css at parent directory.
*/
const sassJob = function () {
	return src( paths.scss)
		.pipe( sass( {style: 'compact'}) )
		.pipe( minifycss( {keepBreaks: false}) )
		.pipe( dest( 'build/' ) )
		.pipe( notify( 'SASS done.' ) );
}

/**
* Concatenate scripts from /js/ folder, minify them and output to scripts.js at parent directory.
*/
const jsJob = function () {
	return src( paths.js )
		.pipe( concat( 'scripts.js' ) )
		.pipe( dest( 'build/' ) )
		.pipe( uglify() )
		.pipe( dest( 'build/' ) )
		.pipe( notify( 'JS done.' ) );
}

/**
* Pull partials into templates and compile into /preview/ folder.
*/
const nunjucksJob = function () {
  return src( 'source/*.+(html|nunjucks)' )
  .pipe( nunjucksRender( {
      path: [ 'source/' ]
    }) )
  .pipe( dest( 'preview/' ) )
};

/**
* Take linked CSS/JS files in html files in /preview/ and inline them, printing everything to /build/ folder.
*/
const buildJob = function () {
	return src( 'preview/*.html' )
	.pipe( inline( {
		base: './',
	}) )
	.pipe( entities( 'encodeNonASCII' ) )
	.pipe( dest( 'build/' ) )
	.pipe( notify( 'Inserted styles and scripts inline into index.html.' ) );
};

/**
* Watch
*/
const watchJob = function () {
	watch( paths.scss, sassJob ),
	watch( paths.js, jsJob ),
	watch( paths.source, nunjucksJob )
};

/**
* Export Tasks
*/
exports.sass = sassJob;
exports.js = jsJob;
exports.nunjucks = nunjucksJob;
exports.watch = watchJob;
exports.build = buildJob;
exports.default = series( sassJob, jsJob, watchJob );