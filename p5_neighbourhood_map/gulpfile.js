var gulp = require('gulp'),
  htmlmin = require('gulp-htmlmin'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  pump = require('pump');

// Paths to various files
var paths = {
  content: ['src/*.html'],
  scripts: ['src/js/**/*.js'],
  styles: ['src/css/**/*.css'],
  images: ['src/img/**/*']
};

// Minifies our HTML files and outputs them to dist/
gulp.task('minify-html', function() {
  return gulp.src(paths.content)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'));
});

// Minifies our CSS files and outputs them to dist/css
gulp.task('minify-css', function() {
  return gulp.src(paths.styles)
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

// Minifies js files and outputs them to dist/js/
gulp.task('minify-js', function(cb) {
  pump([
      gulp.src(paths.scripts),
      uglify(),
      gulp.dest('dist/js')
    ],
    cb
  );
});

// Copy images to dist/imp
gulp.task('copy-images', function() {
  gulp.src(paths.images)
    .pipe(gulp.dest('dist/img'));
});


gulp.task('default', ['minify-html', 'minify-css', 'minify-js','copy-images']);
