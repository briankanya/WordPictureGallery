var gulp = require('gulp');
var uglify = require('gulp-uglify-es').default;
var concat = require('gulp-concat');
var minifyCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var gutil = require('gulp-util');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var fs = require('fs');
	
gulp.task('css', function() {
    gulp.src([
            './src/css/**/*.css'
        ])
        .pipe(minifyCSS())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function() {
    return browserify('./src/js/script.js')
        .transform('brfs')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('fonts', function() {
    gulp.src([
            './src/fonts/*.otf',
			'./src/fonts/*.eot',
			'./src/fonts/*.svg',
			'./src/fonts/*.ttf',
			'./src/fonts/*.woff',
			'./src/fonts/*.woff2'
        ])
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('html', function() {
	gulp.src([
            './src/*.html'
        ])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('images', function() {
    gulp.src([
            './src/img/**/*'
        ])
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('extra', function() {
    gulp.src([
            './src/favicon.ico',
			'./src/.htaccess'
        ])
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['css', 'js', 'html', 'fonts', 'images', 'extra']);