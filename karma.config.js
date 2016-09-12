// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-10-30 using
// generator-karma 0.8.3

var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function (config) {
    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine', 'es6-shim'],

        reporters: ['progress'],

        // list of files / patterns to load in the browser
        files: [

        ],

        exclude: [],

        // preprocess matching files before serving them to the browser
        preprocessors: {
            './build/assets/vendor.bundle.js': ['webpack'],
            './build/assets/main.bundle.js': ['webpack']
        },

        // web server port
        port: 9876,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        /*
         PhantomJS2 is a temporary workaround for https://github.com/karma-runner/karma-phantomjs-launcher/issues/55
         that fixes the memory issue sufficiently to allow all tests to run. When fixed, investigate using normal launcher.
         */
        browsers: [
            //'PhantomJS2'
            'Chrome'
        ],

        coverageReporter: {
            type: 'html',
            dir: 'test/coverage'
        },

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_DISABLE,

        //webpack: webpackConfig,
        webpack: {
            node: {
                fs: 'empty'
            },
            devtool: 'inline-source-map',
            module: webpackConfig.module
        },

        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            require('karma-jasmine'),
            require('karma-webpack'),
            require('karma-chrome-launcher'),
            require('karma-ng-html2js-preprocessor'),
            require('karma-sourcemap-loader'),
            require('karma-coverage'),
            require('karma-ng-scenario'),
            require('karma-es6-shim')
        ]
    });
};
