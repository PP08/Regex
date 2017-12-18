var gulp = require('gulp');
var serve = require('gulp-serve');

gulp.task('serve', serve('static'));
gulp.task('serve-build', serve(['static', 'build']));
gulp.task('serve-prod', serve({
  root: ['static', 'build'],
  // port: 80,
  middleware: function(req, res) {
    // custom optional middleware
  }
}));