const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "url-loader?limit=8192"
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=[name].[ext]"
            }
        ]
    },
    externals: [
        {
            window: "window"
        }
    ],
    resolve: {
        alias: {
        'react': path.join(__dirname, 'node_modules', 'react')
        },
        extensions: ["", ".js", ".jsx", ".json"]
    }
};