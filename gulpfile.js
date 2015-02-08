var gulp               = require('gulp');
var historyApiFallback = require('connect-history-api-fallback');
var plugins            = require('gulp-load-plugins')({ camelize: true });
var runSequence        = require('run-sequence');

var paths   = {
  appFile: 'app/js/app.js',
  indexFile: 'app/index.html',
  viewFiles: './app/views/**/*.html',
  sourceFiles: 'app/js/**/*.js',
  cssFiles: 'app/css/**/*.css',
  gulpFile: 'gulpfile.js',
  dist: {
    root: 'dist/',
    bower: 'dist/bower_components/',
    js: 'dist/js/',
    css: 'dist/css/',
    views: 'dist/views/'
  }
};

gulp.task('browserify', function () {
  // compile js files
  return gulp.src([paths.appFile])
  .pipe(plugins.browserify({
    insertGlobals: true,
    debug: true
  }))
  // bundle to a single file
  .pipe(plugins.concat('bundle.js'))
  .pipe(gulp.dest(paths.dist.js))
  // reload server
  .pipe(plugins.connect.reload());
});

gulp.task('clean', function () {
  return gulp.src(paths.dist.root, {read: false})
  .pipe(plugins.clean({ force: true }));
});

gulp.task('views', function () {
  // compile index.html
  gulp.src(paths.indexFile)
    .pipe(gulp.dest(paths.dist.root));

  // compile views
  return gulp.src(paths.viewFiles)
    .pipe(gulp.dest(paths.dist.views))
    // restart server
    .pipe(plugins.connect.reload());
});

gulp.task('styles', function () {
  // compile index.html
  gulp.src(paths.indexFile)
    .pipe(gulp.dest(paths.dist.root));

  // compile views
  return gulp.src(paths.cssFiles)
    .pipe(gulp.dest(paths.dist.css))
    // restart server
    .pipe(plugins.connect.reload());
});

gulp.task('lib', function () {
  gulp.src('./app/bower_components/**/*.css')
  .pipe(plugins.concat('libbundle.css'))
  .pipe(gulp.dest(paths.dist.css));

  return gulp.src('./app/bower_components/**/*.js')
  .pipe(gulp.dest(paths.dist.bower));
});

gulp.task('watch', function () {
  // scripts
  gulp.watch([paths.sourceFiles], [ 'browserify' ]);

  // views
  gulp.watch([paths.indexFile, paths.viewFiles], [ 'views' ]);

  // styles
  gulp.watch([paths.cssFiles], [ 'styles' ]);
});

gulp.task('compile', function () {
  runSequence('clean', ['browserify', 'views', 'lib', 'styles']);
});

gulp.task('start', ['compile', 'watch'], function () {
  plugins.connect.server({
    root: paths.dist.root,
    livereload: true,
    middleware: function () { return [historyApiFallback]; },
    port: 8888
  });
});
