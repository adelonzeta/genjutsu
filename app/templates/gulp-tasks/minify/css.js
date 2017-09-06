var gulp         = require('gulp');
var strip        = require('gulp-strip-css-comments');
var purify       = require('gulp-purifycss');
var autoprefixer = require('gulp-autoprefixer');

module.exports = function() {
  return gulp.src('build/styles/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(purify([
      'build/**/*.html',
      'build/scripts/**/*.js'
    ], {minify: true}))
    .pipe(strip({
      preserve: false
    }))
    .pipe(gulp.dest('build/styles'));
};

module.exports.dependencies = ['minify:html', 'minify:scripts'];
