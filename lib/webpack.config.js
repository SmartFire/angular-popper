'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
var prod = NODE_ENV === 'production';

var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    APP = path.resolve('./'),
    DIST = path.resolve('./../build'),
    autoprefixer = require('autoprefixer');

console.info('>> node environment is', NODE_ENV);

module.exports = {
    context: APP,
    entry: {
        main: ['./core/module.ts'],
        vendor: ['./core/vendor.ts']
    },
    output: {
        publicPath: "/assets/",
        path: path.resolve(DIST + '/assets/'),
        filename: '[name].bundle.js'
    },
    devServer: {
        host: '0.0.0.0',
        port: '8000',
        proxy: {},
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        historyApiFallback: true,
        hot: !prod,
        inline: !prod
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new ExtractTextPlugin("[name].css", {allChunks: true}),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    resolve: {
        extensions: ['', '.webpack.js', '.ts', '.js'],
        alias: {}
    },

    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint',
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.ts$/,
                loader: prod ? 'ng-annotate!ts' : 'ts',
                exclude: /node_modules/
            },
            {
                test: /jquery\.js$/,
                loader: 'expose?$!expose?jQuery'
            },
            {
                test: /moment\.js$/,
                loader: 'expose?moment'
            },
            {
                test: /crypto-js\.js$/,
                loader: 'expose?crypto-js'
            },
            {
                test: /\.(eot(\?)?|woff|woff2|ttf|svg|png|jpg|gif)$/,
                include: /\node_modules\//,
                loader: 'url?name=[1].[ext]&limit=10000&regExp=node_modules/(.*)'
            },
            {
                test: /\.(eot(\?)?|woff|woff2|ttf|svg|png|jpg|gif)$/,
                exclude: /\node_modules\//,
                loader: 'url?name=[path][name].[ext]&limit=10000'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw!html-minify'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css!postcss?-minimize!sass-loader?=expanded&sourceMap=true&sourceMapContents=true')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css!postcss?-minimize!sass-loader?=expanded&sourceMap=true&sourceMapContents=true')
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    'html-minify-loader': {
        empty: true,
        dom: {
            lowerCaseAttributeNames: false
        }
    },
    postcss: [
        autoprefixer({browsers: ['last 3 versions']})
    ],

    devtool: !prod ? 'source-map' : null
};


if (!prod) {
    module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            //mangle: true,
            //beautify: false,
            sourceMap: false
        })
    );
}

