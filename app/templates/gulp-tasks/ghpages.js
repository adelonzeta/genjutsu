var gulp    = require('gulp');
var ghpages = require('gulp-gh-pages');

module.exports = function() {
  return gulp.src('build/**/*')
    .pipe(ghpages());
};

module.exports.dependencies = ['prod'];
