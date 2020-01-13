/* globals require */
/* globals exports */
"use strict";

const { src, dest, watch , series, task } = require( 'gulp' );
const scss  = require( 'gulp-sass' );
const debug  = require( 'gulp-debug' );
const {server} = require('./server');

const baseURL = './src/';
const scssSrc = 'scss/**/*.scss';
const scssDest = './build/css/';
const watcher = watch(['./src/scss/**/*.scss',baseURL + scssDest],series(compileScss));

function compileScss() {
    console.log('task compileScss()',baseURL + scssSrc);
    return src([baseURL + scssSrc])
        .pipe(debug({title: 'Files: '}))
        .pipe(scss())
        .pipe(dest(scssDest))
        .pipe(server.stream());

}

function watchStyles() {
    return watcher;
}

const watchTask = watchStyles;
const scssTask = compileScss;
exports.watchTask = watchTask;
exports.scssTask = scssTask;