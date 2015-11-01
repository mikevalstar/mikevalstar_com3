// Gulp related
var gulp = require('gulp');
var gulpFrontMatter = require('gulp-front-matter');
var assign = require('lodash').assign;
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var scss = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var s3 = require('gulp-s3-upload');
var size = require('gulp-size');
var moment = require('moment');

// Metalsmith related
var gulpsmith = require('gulpsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var feed = require('metalsmith-feed');
var fs = require('fs');

// Gulp tasks
gulp.task('default', function(cb) {
  runSequence('clean', ['copy:fonts', 'metalsmith', 'scss'], cb);
});

gulp.task('deploy', ['default'], function() {
  var s3Deploy = s3(require('./.s3.json'));

  setTimeout(function() {
    gulp.src('./build/**/*')
            .pipe(s3Deploy({
              Bucket: 'mikevalstar.com',
              ACL: 'public-read',
            }));
  }, 1000); // Timeout to let metalsmith complete
});

gulp.task('watch', ['default', 'connect'], function() {
  gulp.watch(['./src/**/*', './templates/**/*'], ['metalsmith']);
  gulp.watch('./scss/**/*', ['scss']);
});

gulp.task('connect', function() {
  connect.server({
    root: './build',
    livereload: true,
  });
});

gulp.task('metalsmith', function() {
  gulp.src('./src/**/*')
        .pipe(gulpFrontMatter()).on('data', function(file) {
          assign(file, file.frontMatter);
          delete file.frontMatter;
        }).pipe(
            gulpsmith()
                .use(collections({
                  page: {
                    pattern: 'pages/*.md',
                  },
                  post: {
                    pattern: 'posts/*.md',
                    sortBy: 'pubDate',
                    reverse: true,
                  }
                }))
                .use(markdown())
                .use(permalinks(':collection/:link'))
                .use(layouts({engine: 'react', directory: 'templates'}))
                .metadata({site:{
                  title: 'Mikevalstar.com Blog',
                  url: 'http://mikevalstar.com/',
                  webMaster: 'Mike Valstar',
                }})
                .use(feed({collection: 'post'}))
        )
        .pipe(size())
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

gulp.task('scss', function() {
  return gulp.src('./scss/main2.scss')
      .pipe(scss().on('error', scss.logError))
      .pipe(autoprefixer(
            {
              browsers: [
                  '> 1%',
                  'last 4 versions',
                  'firefox >= 4',
                  'safari 7',
                  'safari 8',
                  'IE 8',
                  'IE 9',
                  'IE 10',
                  'IE 11',
              ],
              cascade: false,
            }
        ))
        .pipe(size())
        .pipe(gulp.dest('./build/css'))
        .pipe(connect.reload());
});

gulp.task('copy:fonts', function() {
  return gulp.src('./node_modules/font-awesome/fonts/*')
      .pipe(size())
      .pipe(gulp.dest('./build/fonts'));
});

gulp.task('clean', function() {
  return gulp.src('./build', {read: false})
      .pipe(clean());
});
