var gulp   = require('gulp');
var panini = require('panini');

module.exports = function() {
  gulp.watch('app/styles/**/*.sass', ['sass']);
  gulp.watch('app/**/*.html', ['refresh', 'panini']);
  gulp.watch('app/scripts/**/*.js', ['browserify']);
  gulp.watch('app/images/**/*', ['minify:images']);
};

gulp.task('refresh', function() {
  return panini.refresh();
});

module.exports.dependencies = ['browser-sync'];
