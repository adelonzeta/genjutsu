var gulp       = require('gulp');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function() {
  return gulp.src('app/styles/app.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        'node_modules/bootstrap/scss'
      ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/styles'));
};
