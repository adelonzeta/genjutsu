var gulp = require('gulp');

module.exports = function() {
  return gulp.src('node_modules/font-awesome/fonts/**/*')
    .pipe(gulp.dest('build/fonts'));
};
