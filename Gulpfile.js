// Gulp related
var gulp = require( "gulp" ),
    gulpFrontMatter = require( "gulp-front-matter" ),
    assign = require( "lodash" ).assign,
    clean = require( "gulp-clean" ),
    connect = require( "gulp-connect" ),
    less = require( "gulp-less" ),
    autoprefixer = require( "gulp-autoprefixer" ),
    runSequence = require( "run-sequence" ),
    s3 = require( "gulp-s3-upload" ),
    path = require( "path" ),
    moment = require( "moment" );

// Metalsmith related
var gulpsmith = require( "gulpsmith" ),
    markdown = require( "metalsmith-markdown" ),
    templates = require( "metalsmith-templates" ),
    permalinks = require( "metalsmith-permalinks" ),
    collections = require( "metalsmith-collections" ),
    Handlebars = require( "handlebars" ),
    fs = require( "fs" );

// Handlebars
Handlebars.registerPartial(
        "header",
        fs.readFileSync( __dirname + "/templates/partials/header.hbt" ).toString()
    );

Handlebars.registerPartial(
        "footer",
        fs.readFileSync( __dirname + "/templates/partials/footer.hbt" ).toString()
    );

Handlebars.registerHelper( "log", function( something ) {
    console.log( something );
} );

Handlebars.registerHelper( "momentFormat", function( dt, format ) {
    if ( !dt ) { dt = new Date(); }
    return moment( dt ).format( format );
} );

// Gulp tasks
gulp.task( "default", function( cb ) {
    runSequence( "clean", [ "copy:fonts", "metalsmith", "less" ], cb );
} );

gulp.task( "deploy", [ "default" ], function() {
    var s3Deploy = s3( require( "./.s3.json" ) );

    setTimeout( function() {
        gulp.src( "./build/**/*" )
            .pipe( s3Deploy( {
                Bucket: "mikevalstar.com",
                ACL: "public-read"
            } ) );
    }, 1000 ); // Timeout to let metalsmith complete
} );

gulp.task( "watch", [ "default", "connect" ], function() {
    gulp.watch( [ "./src/**/*", "./templates/**/*" ], [ "metalsmith" ] );
    gulp.watch( "./less/**/*", [ "less" ] );
} );

gulp.task( "connect", function() {
    connect.server( {
        root: "./build",
        livereload: true
    } );
} );

gulp.task( "metalsmith", function() {
    gulp.src( "./src/**/*" )
        .pipe( gulpFrontMatter() ).on( "data", function( file ) {
            assign( file, file.frontMatter );
            delete file.frontMatter;
        } ).pipe(
            gulpsmith()
                .use( collections( {
                    page: {
                        pattern: "pages/*.md"
                    },
                    post: {
                        pattern: "posts/*.md",
                        sortBy: "datetime",
                        reverse: true
                    }
                } ) )
                .use( markdown() )
                .use( permalinks( ":collection/:link" ) )
                .use( templates( "handlebars" ) )
        ).pipe( gulp.dest( "./build" ) )
        .pipe( connect.reload() );
} );

gulp.task( "less", function() {
    return gulp.src( "./less/*.less" )
        .pipe( less( {
            compress: true,
            paths: [ path.join( __dirname, "less", "includes" ) ]
        } ) )
        .pipe( autoprefixer(
            {
                browsers: [
                    "> 1%",
                    "last 4 versions",
                    "firefox >= 4",
                    "safari 7",
                    "safari 8",
                    "IE 8",
                    "IE 9",
                    "IE 10",
                    "IE 11"
                ],
                cascade: false
            }
        ) )
        .pipe( gulp.dest( "./build/css" ) )
        .pipe( connect.reload() );
} );

gulp.task( "copy:fonts", function() {
    return gulp.src( "./node_modules/font-awesome/fonts/*" )
        .pipe( gulp.dest( "./build/fonts" ) );
} );

gulp.task( "clean", function() {
    return gulp.src( "./build", { read: false } )
        .pipe( clean() );
} );
