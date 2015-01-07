'use strict';
var fs = require('fs');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var balmung = require("gulp-balmung");
var tfcsprite = require("gulp-tfcsprite");
var runSequence = require('run-sequence');
var del = require('del');

/**
 * Convert ratio3 images to ratio2
 */
gulp.task('assets', function() {
  return balmung({
    config: require('./conf/balmung-assets.json')
  });
});

/**
 * Build for mock check
 */
gulp.task('build', function(done) {
  runSequence(
    'clean',
    'copy:html',
    'tfcsprite',
    'balmung:images',
    'balmung:sprites',
    done
  );
});

// copy html
gulp.task('copy:html', function() {
  return gulp.src('public/*.html')
    .pipe(gulp.dest('./build'));
});

// tfcsprite
gulp.task('tfcsprite', function() {
  var condition = !!(fs.existsSync(['public/sprites/*.json']));
  return gulp.src('public/*.js')
    .pipe(gulpif(condition, tfcsprite({
      sprites: 'public/sprites'
    })))
    .pipe(gulp.dest('./build'));
});

// balmung for images folder
gulp.task('balmung:images', function() {
  return balmung({
    config: require('./conf/balmung-sprites.json')
  });
});

// balmung for sprites folder
gulp.task('balmung:sprites', function() {
  return balmung({
    config: require('./conf/balmung-images.json')
  });
});

// clean build folder
gulp.task('clean', function(done) {
  del([
    'build/**'
  ], done);
});
