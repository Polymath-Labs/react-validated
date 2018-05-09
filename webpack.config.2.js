'use strict';

const path = require('path');
//const eslintFormatter = require('react-dev-utils/eslintFormatter');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
    appSrc: path.resolve(__dirname, 'src')
}

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = {}; // shouldUseRelativeAssetPaths
// ? // Making sure that the publicPath goes back to to build folder.
// { publicPath: Array(cssFilename.split('/').length).join('../') }
// : {};

// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css';

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react-validated.js',
        // library: 'reactValidated',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            // // First, run the linter.
            // // It's important to do this before Babel processes the JS.
            // {
            //     test: /\.(js|jsx|mjs)$/,
            //     enforce: 'pre',
            //     use: [
            //         {
            //             options: {
            //                 formatter: eslintFormatter,
            //                 eslintPath: require.resolve('eslint'),

            //             },
            //             loader: require.resolve('eslint-loader'),
            //         },
            //     ],
            //     include: path.resolve(__dirname, 'src'),
            // },
            // {
            //     // "oneOf" will traverse all following loaders until one will
            //     // match the requirements. When no loader matches it will fall
            //     // back to the "file" loader at the end of the loader list.
            //     oneOf: [
            //         // "url" loader works just like "file" loader but it also embeds
            //         // assets smaller than specified size as data URLs to avoid requests.
            //         {
            //             test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            //             loader: require.resolve('url-loader'),
            //             options: {
            //                 limit: 10000,
            //                 name: 'static/media/[name].[hash:8].[ext]',
            //             },
            //         },
            //         // Process JS with Babel.
            //         {
            //             test: /\.(js|jsx|mjs)$/,
            //             include: paths.appSrc,
            //             loader: require.resolve('babel-loader'),
            //             options: {

            //                 compact: true,
            //             },
            //         },
            //         // The notation here is somewhat confusing.
            //         // "postcss" loader applies autoprefixer to our CSS.
            //         // "css" loader resolves paths in CSS and adds assets as dependencies.
            //         // "style" loader normally turns CSS into JS modules injecting <style>,
            //         // but unlike in development configuration, we do something different.
            //         // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
            //         // (second argument), then grabs the result CSS and puts it into a
            //         // separate file in our build process. This way we actually ship
            //         // a single CSS file in production instead of JS code injecting <style>
            //         // tags. If you use code splitting, however, any async bundles will still
            //         // use the "style" loader inside the async code so CSS from them won't be
            //         // in the main CSS file.
            //         {
            //             test: /\.css$/,
            //             loader: ExtractTextPlugin.extract(
            //                 Object.assign(
            //                     {
            //                         fallback: {
            //                             loader: require.resolve('style-loader'),
            //                             options: {
            //                                 hmr: false,
            //                             },
            //                         },
            //                         use: [
            //                             {
            //                                 loader: require.resolve('css-loader'),
            //                                 options: {
            //                                     importLoaders: 1,
            //                                     minimize: true,
            //                                     sourceMap: shouldUseSourceMap,
            //                                 },
            //                             },
            //                             {
            //                                 loader: require.resolve('postcss-loader'),
            //                                 options: {
            //                                     // Necessary for external CSS imports to work
            //                                     // https://github.com/facebookincubator/create-react-app/issues/2677
            //                                     ident: 'postcss',
            //                                     plugins: () => [
            //                                         require('postcss-flexbugs-fixes'),
            //                                         autoprefixer({
            //                                             browsers: [
            //                                                 '>1%',
            //                                                 'last 4 versions',
            //                                                 'Firefox ESR',
            //                                                 'not ie < 9', // React doesn't support IE8 anyway
            //                                             ],
            //                                             flexbox: 'no-2009',
            //                                         }),
            //                                     ],
            //                                 },
            //                             },
            //                         ],
            //                     },
            //                     extractTextPluginOptions
            //                 )
            //             ),
            //             // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
            //         },
            //         // "file" loader makes sure assets end up in the `build` folder.
            //         // When you `import` an asset, you get its filename.
            //         // This loader doesn't use a "test" so it will catch all modules
            //         // that fall through the other loaders.
            //         {
            //             loader: require.resolve('file-loader'),
            //             // Exclude `js` files to keep "css" loader working as it injects
            //             // it's runtime that would otherwise processed through "file" loader.
            //             // Also exclude `html` and `json` extensions so they get processed
            //             // by webpacks internal loaders.
            //             exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            //             options: {
            //                 name: 'static/media/[name].[hash:8].[ext]',
            //             },
            //         },
            //         // ** STOP ** Are you adding a new loader?
            //         // Make sure to add the new loader(s) before the "file" loader.
            //     ],
            // }
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components|build)/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['env']
                    // }
                }
            }
        ]
    },
    externals: {
        'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
    },
    plugins: [    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
        // new ExtractTextPlugin({
        //     filename: cssFilename,
        // }),
    ]
};