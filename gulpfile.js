var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var minifycss = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inline = require('gulp-inline');
var rename = require('gulp-rename');

// Style Paths
var scss = [
	'src/scss/*'
]

// JS Paths
var js = [
	'src/js/*'
];

/**
* Process SASS and output to style.css at parent directory.
*/
gulp.task('sass', function(){
	return gulp.src(scss)
		.pipe(sass({style: 'compact'}))
		.pipe(minifycss({keepBreaks: false}))
		.pipe(gulp.dest('./'))
		.pipe(notify('SASS done.'));
});

/**
* Concatenate scripts from /js/ folder, minify them and output to scripts.js at parent directory.
*/
gulp.task('js', function(){
	return gulp.src(js)
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('./'))
		.pipe(uglify())
		.pipe(gulp.dest('./'))
		.pipe(notify('JS done.'));
});

/**
* Take linked files in index-source.html and inline them, printing everything to index.html.
*/
gulp.task('inline', function(){
	return gulp.src('index-source.html')
		.pipe(inline({
			base: './',
		}))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('./'))
		.pipe(notify('Inserted styles and scripts inline into index.html.'));
});

/**
* Watch
*/
gulp.task('watch', function(){
	gulp.watch(scss, ['sass']);
	gulp.watch(js, ['js']);
});

/**
* Default
*/
gulp.task('default', ['sass', 'js', 'watch']);

//TODO: Font woff inline -> @font-family in CSS

//TODO: Batch image upload to Pardot

//TODO: Some kind of templating engine