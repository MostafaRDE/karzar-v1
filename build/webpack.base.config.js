const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const { VueLoaderPlugin } = require('vue-loader');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: isProd
        ? false
        : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            'public': path.resolve(__dirname, '../public')
        }
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.styl(us)?$/,
                use: isProd
                    ? ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: { minimize: true }
                            },
                            'stylus-loader'
                        ],
                        fallback: 'vue-style-loader'
                    })
                    : ['vue-style-loader', 'css-loader', 'stylus-loader']
            },
        ]
    },
    performance: {
        hints: false
    },
    plugins: isProd
        ? [
            new VueLoaderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new ExtractTextPlugin({
                filename: 'common.[chunkhash].css'
            }),
            // Remove unused CSS using purgecss. See https://github.com/FullHuman/purgecss
            // for more information about purgecss.
            new PurgecssPlugin({
                paths: glob.sync([
                    path.join(__dirname, './../src/index.html'),
                    path.join(__dirname, './../src/assets/styles/index.styl'),
                    path.join(__dirname, './../src/App.vue'),
                    path.join(__dirname, './../src/**/*.vue'),
                    path.join(__dirname, './../src/**/*.js'),
                ], { nodir: true }),
                extractors: [
                    {
                        extractor: class TailwindExtractor {
                            static extract(content) {
                                return content.match(/[A-z0-9-_:\/]+/g) || [];
                            }
                        },
                        extensions: ['html', 'vue', 'js', 'styl'],
                    },
                ],
            }),
        ]
        : [
            new VueLoaderPlugin(),
            new FriendlyErrorsPlugin(),
        ]
};