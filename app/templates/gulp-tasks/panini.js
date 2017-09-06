var gulp   = require('gulp');
var panini = require('panini');

module.exports = function() {
  return gulp.src('app/pages/**/*.html')
    .pipe(panini({
      root: 'app/pages',
      layouts: 'app/layouts',
      partials: 'app/partials',
      helpers: 'app/helpers',
      data: 'app/data'
    }))
    .pipe(gulp.dest('build'));
};
