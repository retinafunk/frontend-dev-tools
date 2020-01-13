
/* globals exports */

"use strict";

const { src, dest, watch , series, task } = require( 'gulp' );
const tailwindcss = require('tailwindcss');
const postcss = require('gulp-postcss');
const debug  = require( 'gulp-debug' );
const {server} = require('./server');

const baseURL = './src/';
const cssSrc = 'pcss/**/*.css';
const cssDest = './build/css/';

const watcher = watch([],series(compilePostCss));

function compilePostCss() {
    console.log('compilePostCss');
    return src([baseURL+cssSrc])
        .pipe(postcss([
            tailwindcss('./tailwind.config.js'),
            require('autoprefixer')
        ]))
        .pipe(dest(cssDest))
        .pipe(server.stream());
}

function watchStylesTw(){
    return watcher;
}

const watchTask= watchStylesTw;
const postcssTask = compilePostCss;

exports.watchTask= watchTask;
exports.postcssTask= postcssTask;