var gulp      = require('gulp');
var loadTasks = require('gulp-task-loader');

loadTasks();  // load tasks from 'gulp-tasks' folder

gulp.task('default', ['panini', 'sass', 'browserify', 'minify:images', 'fonts']);
gulp.task('serve', ['watch']);
gulp.task('prod', ['minify:html', 'minify:scripts', 'minify:css']);
gulp.task('deploy', ['ghpages']);
