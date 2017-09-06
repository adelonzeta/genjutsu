var gulp    = require('gulp');
var defer   = require('gulp-defer');
var htmlmin = require('gulp-htmlmin');

module.exports = function() {
  gulp.src('build/*.html')
    .pipe(defer())
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true
    }))
    .pipe(gulp.dest('build'));
};

module.exports.dependencies = ['default'];
