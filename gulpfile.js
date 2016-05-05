'use strict';

var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var merge = require('utils-merge');

var config = {
  js: {
    src: './assets/components/bookmarks.jsx',
    watch: './assets/components/**/*',
    outputDir: './public/js/',
    outputFile: 'build.js',
  },
};

function bundle(bundler) {

  bundler
    .bundle()
    .on('error', function(err){
    	console.log(err.message);
    	this.emit('end');
    })
    .pipe(source('bookmarks.jsx'))
    .pipe(buffer()) 
    .pipe(rename(config.js.outputFile))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./map'))
    .pipe(gulp.dest(config.js.outputDir))
    .pipe(notify({
      message: 'Generated file: <%= file.relative %>',
    }));
}

gulp.task('default', function() {
  var args = merge(watchify.args, { debug: true });

  var bundler = browserify(config.js.src, args) 
    .plugin(watchify, {ignoreWatch: ['**/node_modules/**']})
    .transform(babelify, {presets: ['es2015', 'react']});

  bundle(bundler);

  bundler.on('update', function() {
    bundle(bundler);
  });
});