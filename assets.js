'use strict';

var path = require('path');

module.exports = {
    source: path.join(__dirname, '/src'),
    bin: path.join(__dirname, '/build'),
    js: [
        '/vendor/qwery.min.js',
        '/vendor/trim.js',
        '/lazy.js',
        '/lazy-loader.js'
    ]
};