---
title: Faster Gulp, Browserify, Babelify, Watchify and React build process explained.
link: fast-gulp-browserify-babelify-watchify-react-build
layout: post.jsx
series:
pubDate: 2015-11-08 14:15:00
updated: 2016-06-09 14:15:00
author:
    name: Mike Valstar
    email: mikevalstar@gmail.com
excerpt: >
    <p>In the last few months quite a few changes have happened to Browserify, Babelify, and React; most of the existing build processes I've seen on the net have stopped working, and the ones that do are poorly explained. Here is my take on a full react build process. With this setup the initial build takes 4.2s on my system and any source updates happen in under 400ms.</p>
meta:
    twitterhandle: "@mikevalstar"
    description: Gulp, Browserify, Watchify and React Build process explained
---

In the last few months quite a few changes have happened to Browserify, Babelify, and React; most of the existing build processes I've seen on the net have stopped working, and the ones that do are poorly explained. Here is my take on a full react build process. With this setup the initial build takes 4.2s on my system and any source updates happen in under 400ms.

<div class="alert alert-info" role="alert"> <strong><time datetime="2016-06-09T14:15:00">April 9 2017</time></strong> Updated to React 15.0, and latest babel presets. </div>

## Tested With
* **babelify - 7.2.0** with babel-preset-es2015 & babel-preset-react
* **browserify - 13.0.0**
* **gulp - 3.9.1**
* **gulp-sourcemaps - 1.6.0**
* **react - 15.0.1** with react-dom
* **vinyl-buffer - 1.0.0**
* **vinyl-source-stream - 1.1.0**
* **watchify - 3.7.0**

## Quick Version:

<script src="https://gist.github.com/mikevalstar/51ffb4e20a5ca22be3b0.js"></script>

## Gulp
[Gulp](https://github.com/gulpjs/gulp) is an automation toolkit for your projects and is my go-to tool for speeding up my development process. Gulp will allos\ws me to see my changes to my app instantly and create a single command build process for the entire application; this is especially important when adding a new developer to a project and ensuring code quality. (_eslint, jasmine, istanbul and other code quality based posts I plan on writing later_).

You can read up more about gulp on their [official site](http://gulpjs.com/).

## Browserify
[Browserify](https://github.com/substack/node-browserify) adds node style `require()` functionality to your project. And as of React 0.14 they have deprecated the JSX transformer in favor of [Babel](http://babeljs.io/) and have moved their documentation to use Browserify / CommonJS format.

The first step in our pipeline is to import your main javascript file with browserify to import and traverse the file structure of your project.

    gulp.task('default', function() {
      var bundler = browserify(config.js.src, args) // Browserify

      bundle(bundler);
    }

This will traverse the require tree in our project and wrap it appropriately. We then call the bundle function to pass off the browserify object to a common gulp bundling function.

## Babelify + React
[Babelify](https://github.com/babel/babelify) is a browserify transform that uses Babel as the backend. This is required if you use jsx format files within your project. For this (as of babel 6.0) you will need to load presets, this requires that you install `babel-preset-es2015` and `babel-preset-react`.

    .transform(babelify, {presets: ['es2015', 'react']}); // Babel transforms

This will translate your code into common browser compatible javascript and provide shims as needed for your source.

## Watchify
[Watchify](https://github.com/substack/watchify) is a browserify plugin that will update the source files inside of a browserify bundle and trigger events when whose files change on the file system.

    .plugin(watchify, {ignoreWatch: ['**/node_modules/**', '**/bower_components/**']}) // Watchify to watch source file changes

    bundler.on('update', function() {
      bundle(bundler); // Re-run bundle on source updates
    });

watchify will watch files in your source directory and replace them (and them alone) inside of the browserify bundle and cause a re-build without re-reading all files within your stack.

## Vinyl
[Yinyl](https://github.com/gulpjs/vinyl) is meta-file object used by gulp ([read more](https://medium.com/@contrahacks/gulp-3828e8126466)). Browserify however uses a standard node file stream so we need to convert this stream to this style of input for further gulp processing.

Browserify will output a standard file stream when calling the `bundle()` function and convert it to vinyl format and adds a filename with `vinyl-source-stream` and then converts it to a buffered version with `vinyl-buffer` that we can pass on to our other gulp tasks.

    var source = require('vinyl-source-stream'); // Vinyl stream support
    var buffer = require('vinyl-buffer'); // Vinyl stream support
    var rename = require('gulp-rename'); // Rename sources

    function bundle(bundler) {
      bundler
        .bundle()
        .pipe(source('main.jsx')) // Set source name
        .pipe(buffer()) // Convert to gulp pipeline
        .pipe(rename(config.js.outputFile)) // Rename the output file
        .pipe(gulp.dest(config.js.outputDir)) // Set the output folder
    }

From this we have a gulp pipeline we can use for output.

## Sourcemaps
By default Browserify will generate a sourcemap inline if you include the `debug` flag in the output. Personally I don't like inline sourcemaps, they inflate the file size of your javascript and subsequently increase load times of your test environment(s).

With `gulp-sourcemaps` you can extract the inline sourcemap and output it to a folder.

    .pipe(sourcemaps.init({loadMaps: true})) // Extract the inline sourcemaps
    .pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to

## Notifications & Livereload
Lastly I like to be notified about the file updates and have my browser reload it's contents when the source changes, thats the whole idea of the watchify command and speeding up your development process. This can be achieved with gulp-notify and gulp-livereload.

    ...
    .pipe(notify({
      message: 'Generated file: <%= file.relative %>',
    })) // Output the file being created
    .pipe(livereload()); // Reload the view in the browser
    ...

    ...
    livereload.listen(); // Start livereload server
    ...

## Additional tweaks
Error output and duration output are a couple of additional items I have in the example. I'll leave it up to the reader to see how that works.

_see_
* `gulp-util`
* `chalk`
* `gulp-duration`

## References
* https://gist.github.com/Fishrock123/8ea81dad3197c2f84366
* https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
