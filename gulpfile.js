const gulp = require('gulp');
const wrench = require('wrench');
const runSequence = require('run-sequence');

// configure wrench to read all the files in gulp-tasks directory. filters out looking for any file that ends in js
// take all the .js files and map them to our require function. this includes all of our gulp-tasks and make them available to be run by gulp
wrench
  .readdirSyncRecursive('./gulp-tasks')
  .filter(function(file) {
    return (/\.(js)$/i).test(file);
  })
  .map(function(file) {
    require('./gulp-tasks/' + file)
  });

// start gulp task by cleaning then running serve
gulp.task('default', function(done) {
  runSequence('clean', 'serve', function() {
    // console.log('Run something else');
    done();
  });
});