/* globals require */
"use strict";

const { task, parallel,series,watch } = require( 'gulp' );

const scss = require('./tasks/scss');
const postcss = require('./tasks/postcss');
const rollup = require('./tasks/bundleScripts');
const watchHTMLTask = require('./tasks/watchStaticHtml');
const {serve,serveProxy,reload} = require('./tasks/server');

const envBuild = ((process.env.NODE_ENV || 'production').trim().toLowerCase() === 'production');
const envDev = ((process.env.NODE_ENV || 'development').trim().toLowerCase() === 'development');

let server = envBuild ? serveProxy  : serve;

console.log('mode : ',process.env.NODE_ENV,envBuild,envDev);

task('stylespostcss',series(postcss.postcssTask));
task('watchPostCss',series(postcss.postcssTask,postcss.watchTask));
task('watchhtml',series(watchHTMLTask.watchHTMLTask));
task('watchhtml2',series(watchHTMLTask.watchHTMLTask2));
task('styles',series(scss.scssTask));
task('scripts',series(rollup.rollupTask));
task('serve',series(serve));

task('default', series(server,watchHTMLTask.watchHTMLTask,rollup.rollupTask,scss.watchTask,postcss.watchTask));
