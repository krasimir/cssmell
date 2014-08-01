var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('js', function() {
	gulp.src('chrome/js/src/**/*.js')
	.pipe(concat('modulize.js'))
	.pipe(gulp.dest('chrome/js'))
});

gulp.task('watchers', function() {
	gulp.watch('chrome/js/src/**/*.js', ['js']);
});

gulp.task('default', ['js', 'watchers']);