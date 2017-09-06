var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var browserify = require('browserify');

module.exports = function() {
  return browserify('app/scripts/app.js')
    .transform('babelify')
    .transform({
      global:true
    }, 'browserify-shim')
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('build/scripts'));
};
