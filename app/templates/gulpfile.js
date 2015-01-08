'use strict';
var fs = require('fs');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var balmung = require("gulp-balmung");
var tfcsprite = require("gulp-tfcsprite");
var runSequence = require('run-sequence');
var del = require('del');
var glob = require("glob");

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
gulp.task('tfcsprite', function(done) {
  glob("public/sprites/**/*.json", function (er, files) {
    var condition = (files.length > 0);
    gulp.src('public/*.js')
      .pipe(gulpif(condition, tfcsprite()))
      .pipe(gulp.dest('./build')).on('end', function() {
        done();
      });
  });
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
    'build/**',
    '!build/images'
  ], done);
});
