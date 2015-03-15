// gulp related
var gulp = require('gulp'),
    gulp_front_matter = require('gulp-front-matter'),
    assign = require('lodash').assign,
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    runSequence = require('run-sequence'),
    s3 = require('gulp-s3-upload'),
    path = require('path');

// Metalsmith related
var gulpsmith = require('gulpsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    permalinks = require('metalsmith-permalinks'),
    collections = require('metalsmith-collections'),
    Handlebars = require('handlebars'),
    fs = require('fs');

// Handlebars
Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

// Gulp tasks
gulp.task('default', function (cb) {
    runSequence('clean', ['metalsmith', 'less'], cb);
});

gulp.task('deploy', ['default'], function () {
    var s3Deploy = s3(require('./.s3.json'));

    setTimeout(function(){
        gulp.src("./build/**/*")
            .pipe(s3Deploy({
                Bucket: 'mikevalstar.com',
                ACL: 'public-read'
            }));
    }, 1000); // timeout to let metalsmith complete
});

gulp.task('watch', ['connect'], function() {
    gulp.watch(['./src/**/*', './templates/**/*'], ['metalsmith']);
    gulp.watch('./less/**/*', ['less']);
});

gulp.task('connect', function() {
    connect.server({
        root: './build',
        livereload: true
    });
});

gulp.task('metalsmith', function() {
    gulp.src("./src/**/*")
        .pipe(gulp_front_matter()).on("data", function(file) {
            assign(file, file.frontMatter);
            delete file.frontMatter;
        }).pipe(
            gulpsmith()
                .use(collections({
                    page: {
                        pattern: 'pages/*.md'
                    },
                    post: {
                        pattern: 'posts/*.md',
                        sortBy: 'date',
                        reverse: true
                    }
                }))
                .use(markdown())
                .use(templates('handlebars'))
                .use(permalinks(':collection/:title'))
        ).pipe(gulp.dest("./build"))
        .pipe(connect.reload());
});

gulp.task('less', function () {
    return gulp.src('./less/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
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
                    'IE 11'
                ],
                cascade: false
            }
        ))
        .pipe(gulp.dest('./build/css'))
        .pipe(connect.reload());
});

gulp.task('clean', function() {
    return gulp.src('./build', {read: false})
        .pipe(clean());
});
