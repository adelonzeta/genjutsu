var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');

module.exports = function() {
  return gulp.src('app/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'));
};
