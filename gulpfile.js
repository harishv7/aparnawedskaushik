// including plugins
var gulp = require('gulp')
, uglify = require("gulp-uglify")
, minifyCss = require("gulp-minify-css");;

// minify js
gulp.task('minify-js', function () {
	gulp.src('./assets/js/*.js') // path to your files
		.pipe(uglify())
		.pipe(gulp.dest('assets/js/minified'));
});

// minify css
gulp.task('minify-css', function () {
	gulp.src('./assets/css/*.css') // path to your file
		.pipe(minifyCss())
		.pipe(gulp.dest('assets/css/minified'));
});

// default gulp task - just run gulp in command line
gulp.task('default', ['minify-js', 'minify-css'], function() {
});

// ask gulp to monitor changes & auto execute tasks
// watch for JS changes
gulp.watch('./assets/js/*.js', function() {
	gulp.run('minify-js');
});

// watch for CSS changes
gulp.watch('./assets/css/*.css', function() {
	gulp.run('minify-css');
});