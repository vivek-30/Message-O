const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    "mode": "development",
    "entry": "./src/index.js",
    "output": {
        "path": __dirname + '/dist',
        "filename": "bundle.js"
    },
    "devtool": "source-map",
    "devServer": {
        historyApiFallback: true,
        contentBase: './',
        port: 3000,
        open: true
    },
    "module": {
        "rules": [
            {
                "enforce": "pre",
                "test": /\.js$/,
                "exclude": /node_modules/,
                "loader": "eslint-loader",
                "options": {
                  "emitWarning": true,
                  "failOnError": false,
                  "failOnWarning": false
                }
            },
            {
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader"
                }
            },
            {
                "test": /\.css$/,
                "use": [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                "test": /\.html$/,
                "use": [
                    {
                        "loader": "html-loader"
                    }
                ]
            },
            {
                "test": /\.(png|jpe?g|gif|mp3)$/i,
                "use": [
                  {
                    "loader": "file-loader"
                  }
                ]
            }
        ]
    },
    "plugins": [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        })
    ]
}