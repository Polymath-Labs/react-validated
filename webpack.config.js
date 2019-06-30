const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pkg = require('./package.json');
const path = require('path');
const libraryName= pkg.name;

module.exports = {
    entry: path.join(__dirname, "./src/index.lib.js"),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index.js',
        library: libraryName,
        libraryTarget: 'commonjs2',
        publicPath: '/dist/',
        umdNamedDefine: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'react-validated.css',
        }),
    ],
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    },
    module: {
        rules : [
            {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options:{
                        fallback: "file-loader",
                        name: "[name][md5:hash].[ext]",
                        outputPath: 'assets/',
                        publicPath: '/assets/'
                    }
                }    
            ]
        },
        {
            test: /\.*css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            },

            {
                loader: "css-loader",
            },

            {
                loader: 'sass-loader'
            }],
        },
        {
            test: /\.(js|jsx)$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ],
                    plugins: [
                        "@babel/plugin-proposal-class-properties"
                    ],
                },
            },
            include: path.resolve(__dirname, "src"),
            exclude: /node_modules/,
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: ["file-loader"],
        },
        {
            test: /\.(pdf|doc|zip)$/,
            use: ["file-loader"],
        }]
    },
    resolve: { 
        alias: { 
            'react': path.resolve(__dirname, './node_modules/react') ,
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
            'assets': path.resolve(__dirname, 'assets')
        },
    },
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        }
    }
};