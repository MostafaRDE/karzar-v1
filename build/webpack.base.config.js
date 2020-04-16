const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const { VueLoaderPlugin } = require('vue-loader');
const Dotenv = require('dotenv-webpack');
TerserJSPlugin = require('terser-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: isProd
        ? false
        : '#cheap-module-source-map',
    mode: isProd ? 'production' : 'development',
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
                use: [
                    {
                        loader: ExtractCssChunks.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            // if hmr does not work, this is a forceful method.
                            reloadAll: true,
                        },
                    },
                    'css-loader',
                    'stylus-loader'
                ],
            },
        ]
    },
    performance: {
        hints: false
    },
    optimization: {
        minimize: isProd,
        minimizer: isProd ? [
            new TerserJSPlugin({
                test: /\.js($|\?)/i,
                sourceMap: !isProd,
            }),
            new OptimizeCSSAssetsPlugin({})
        ] : [],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.styl(us)?$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: isProd
        ? [
            new VueLoaderPlugin(),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new ExtractCssChunks({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].[hash].css',
                // chunkFilename: isProd ? '[id].[hash].css' : '[id].css',
                ignoreOrder: true, // Enable to remove warnings about conflicting order
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
                whitelist: ['h-60', 'h-40'],
                whitelistPatterns: [/^theme--dark/],
            }),
            new Dotenv({
                path: './.env.production',
            })
        ]
        : [
            new VueLoaderPlugin(),
            new FriendlyErrorsPlugin(),
            new ExtractCssChunks({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
                // chunkFilename: isProd ? '[id].[hash].css' : '[id].css',
                ignoreOrder: false, // Enable to remove warnings about conflicting order
            }),
            new Dotenv({
                path: '.env.development',
            })
        ]
};
