/* globals require */
"use strict";

const { watch,series  } = require( 'gulp' );
const { reload } = require('./server');

const watcher = watch(['./src/scss/**/*.scss'],series(justReload));

function reloadHtml(){
    return watch(['./build/**/*.html'],done=>{
        console.log('changed Html file');
        reload();
        done();
    });
}
function justReload(done) {
    reload();
    done();
}
function watchHTML() {
    return watcher;
}
console.log('watchHTML');
const watchHTMLTask = reloadHtml;
const watchHTMLTask2 = watchHTML;
exports.watchHTMLTask = watchHTMLTask;
exports.watchHTMLTask2 = watchHTMLTask2;