/* globals require */
"use strict";

//import browserSync from 'browser-sync';
const browserSync = require('browser-sync');
const server = browserSync.create();

function reload(done) {
    server.reload();
   // done();
}

function serve(done) {
    server.init({
        server:{
            baseDir: './build/',
            index: 'index.html'
        }
    });
    done();
}

function serveProxy(done) {
    console.log('Browsersync Proxy ');
    server.init({
            proxy: 'https://www.mobile-massagen-duesseldorf.de',
            files : '../build/**',
            serveStatic : ['../build'],
            rewriteRules :[
                {
                    match : new RegExp('/site/templates/build/css/index.css'),
                    fn : function () {
                        return 'css/index.css';
                    }
                },
                {
                    match : new RegExp('/site/templates/build/js/app.js'),
                    fn : function () {
                        return 'js/app.js';
                    }
                }
            ]
        }
    );
    done();
}

export {server,reload,serve,serveProxy};