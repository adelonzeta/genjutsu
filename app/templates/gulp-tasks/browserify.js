var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var browserify = require('browserify');

module.exports = function() {
  return browserify('app/scripts/app.js')
    .transform('babelify')
    <%_ if (framework != 'bulma') { _%>
    .transform({
      global:true
    }, 'browserify-shim')
    <%_ } _%>
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('build/scripts'));
};
