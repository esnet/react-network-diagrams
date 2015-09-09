/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

module.exports = {

    entry: {
        app: ["./examples/modules/main.jsx"]
    },

    output: {
        filename: "examples-bundle.js"
    },

    module: {
        loaders: [
            { test: /\.(js|jsx)$/,
                loader: "babel?optional=es7.objectRestSpread" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.(png|jpg|gif)$/, loader: "url-loader?limit=8192"},
            { test: /\.json$/, loader: "json-loader" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: "file-loader?name=[name].[ext]" }
        ]
    },

    externals: [
        {
            window: "window"
        }
    ],

    resolve: {
        extensions: ["", ".js", ".jsx", ".json"]
    }
};
