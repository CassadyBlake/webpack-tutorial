const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: ''
    },
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        index: 'index.html',
        port: 9000,
        writeToDisk: true
    },
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
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'
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
        // removes previous hashed bundle files from dist folder...
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',

                // clear files from a folder outside of dist/path...
                // path.join(process.cwd(), 'build/**/*')
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