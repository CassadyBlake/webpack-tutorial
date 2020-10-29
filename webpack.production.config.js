const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        // contenthash ensures that if you make an update to your site, the user's browser will reset it's cache of the site...
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: ''
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/env' ],
                        plugins: [ 'transform-class-properties' ]
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            }
        ]
    },
    plugins: [

        // compresses css/style files for you...
        new MiniCssExtractPlugin({
            // contenthash ensures that if you make an update to your site, the user's browser will reset it's cache of the site...
            filename: 'styles.[contenthash].css',

        }),

        // removes previous hashed bundle files from dist folder...
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',

                // clear files from a folder outside of dist/path...
                path.join(process.cwd(), 'build/**/*')
            ]
        }),

        // allows you to update index.html with contenthash numbers for style and js bundles automatically...
        new HtmlWebpackPlugin({
            // customize the index.html file see https://github.com/jantimon/html-webpack-plugin#options ...
            title: 'Hello World',
            template: 'src/index.hbs',
            description: 'Some description'
        })
    ]
}