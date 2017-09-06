var gulp   = require('gulp');
var minify = require('gulp-minify');

module.exports = function() {
  return gulp.src('build/scripts/**/*.js')
    .pipe(minify({
      ext: {
        src: '-debug.js',
        min: '.js'
      },
      noSource: true
    }))
    .pipe(gulp.dest('build/scripts'));
};

module.exports.dependencies = ['minify:html'];
