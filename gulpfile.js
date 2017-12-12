var gulp = require('gulp');
var uglify = require('gulp-uglify-es').default;
var concat = require('gulp-concat');
var minifyCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var gutil = require('gulp-util');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
	
gulp.task('css', function() {
    gulp.src([
            './src/css/**/*.css'
        ])
        .pipe(minifyCSS())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function() {
    return browserify('./src/js/bundle.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', function() {
	gulp.src([
            './src/*.html'
        ])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('extra', function() {
    gulp.src([
            './src/favicon.ico',
			'./src/.htaccess'
        ])
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['css', 'js', 'html', 'extra']);