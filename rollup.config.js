// import resolve from '@rollup/plugin-node-resolve';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: '../src/js/main.js',
    output: {
        file: '../build/js/app.js',
        format: 'iife',
       // format: 'esm',
        name: 'MyModule'
    },
    plugins: [
        resolve(),
        commonjs()
    ]
};