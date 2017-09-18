var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var minifycss = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inline = require('gulp-inline');
var rename = require('gulp-rename');
var entities = require('gulp-html-entities');
var nunjucksRender = require('gulp-nunjucks-render');

// Style Paths
var scss = [
	'assets/scss/*'
]

// JS Paths
var js = [
	'assets/js/*'
];

// Source Files
var source = [
	'source/**/*'
];

/**
* Process SASS and output to style.css at parent directory.
*/
gulp.task('sass', function(){
	return gulp.src(scss)
		.pipe(sass({style: 'compact'}))
		.pipe(minifycss({keepBreaks: false}))
		.pipe(gulp.dest('build/'))
		.pipe(notify('SASS done.'));
});

/**
* Concatenate scripts from /js/ folder, minify them and output to scripts.js at parent directory.
*/
gulp.task('js', function(){
	return gulp.src(js)
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('build/'))
		.pipe(uglify())
		.pipe(gulp.dest('build/'))
		.pipe(notify('JS done.'));
});

/**
* Pull partials into templates and compile into /preview/ folder.
*/
gulp.task('nunjucks', function() {
  return gulp.src('source/*.+(html|nunjucks)')
  .pipe(nunjucksRender({
      path: ['source/']
    }))
  .pipe(gulp.dest('preview/'))
});

/**
* Take linked CSS/JS files in html files in /preview/ and inline them, printing everything to /build/ folder.
*/
gulp.task('build', function(){
	return gulp.src('preview/*.html')
	.pipe(inline({
		base: './',
	}))
	.pipe(entities('encodeNonASCII'))
	.pipe(gulp.dest('build/'))
	.pipe(notify('Inserted styles and scripts inline into index.html.'));
});

/**
* Watch
*/
gulp.task('watch', function(){
	gulp.watch(scss, ['sass']);
	gulp.watch(js, ['js']);
	gulp.watch(source, ['nunjucks']);
});

/**
* Default
*/
gulp.task('default', ['sass', 'js', 'watch']);

//TODO: Font woff inline -> @font-family in CSS

//TODO: Batch image upload to Pardot