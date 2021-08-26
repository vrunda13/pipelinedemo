const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    devtool: 'eval-source-map',

    entry: path.resolve(__dirname, 'src/js/index.js'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'index.js'
    },

    devServer: {
        port: 4200,
        host: '0.0.0.0',
        disableHostCheck: true,
        sockPort: process.env.SOCK_PORT,
        sockPath: process.env.SOCK_PATH
    },

    module: {

        rules: [

            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },

            {
                test: /\.handlebars$/,
                loader: 'handlebars-loader'
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sourceMap: true
                        }
                    }
                ],
            },

        ]

    },

    plugins: [

        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            title: 'TextareaWithLimits',
            favicon: '',
            template: path.resolve(__dirname, 'src/index.html'),
            filename: path.resolve(__dirname, 'dist/index.html'),
	        publicPath: `/ide/${process.env.ASSET_PORT}/`
        }),

        new MiniCssExtractPlugin({
            filename: "style.css"
        })

    ]

};
