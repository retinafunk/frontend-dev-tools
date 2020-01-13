(function () {
    'use strict';

    function mod () {
        console.log('I am an imported module');
    }

    const out = mod();

    console.log('2 main.js',out);

}());
