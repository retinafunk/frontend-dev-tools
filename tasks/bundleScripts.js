/* globals require */
"use strict";

const {  dest, series , watch } = require( 'gulp' );
let rollup = require('rollup');
const {server} = require('./server');
let commonjs = require('rollup-plugin-commonjs');
let nodeResolve = require('rollup-plugin-node-resolve');
let file = require('gulp-file');

const watcher = watch(['./src/js/**/*.js'],series(bundleJsModules));

function rollupMakeBundle(){
    return rollup
        .rollup({
            input: './src/js/main.js',
            plugins: [
                commonjs(),
                nodeResolve()
            ]
        }).then(bundle => bundle.generate({
            format: 'iife',
            name: 'main'
        }));
}

function bundleJsModules() {
    return rollupMakeBundle()
        .then(gen => {
            const code = gen.output[0].code;
            file('app.js', code, { src: true })
                .pipe(dest('./build/js/'))
                .pipe(server.stream());
        });
}


function watchScripts() {
    console.log("watchScripts()");
    return watcher;
}

const rollupTask = watchScripts;
exports.rollupTask = rollupTask;