var gulp       = require('gulp');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function() {
  return gulp.src('app/styles/app.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        <%_ if (framework == 'bootstrap-4') { _%>
        'node_modules/bootstrap/scss',
        <%_ } _%>
        <%_ if (framework == 'bourbon') { _%>
        'node_modules/bourbon/app/assets/stylesheets',
        'node_modules/bourbon-neat/app/assets/stylesheets',
        <%_ } _%>
        <%_ if (framework == 'bulma') { _%>
        'node_modules/bulma',
        <%_ } _%>
        <%_ if (framework == 'foundation') { _%>
        'node_modules/foundation-sites/dist/css',
        <%_ } _%>
        'node_modules/font-awesome/scss'
      ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/styles'));
};
