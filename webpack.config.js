const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ShakePlugin = require('webpack-common-shake').Plugin;

module.exports = {
    mode: 'development',
    entry: {
        iframe: './src/iframe/index.ts',
        snippet: './src/snippet/index.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname + '/dist')
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        "rules": [
            {
                "test": /\.ts/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "ts-loader",
                    "options": {
                        "transpileOnly": true
                    }
                }
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                loader: 'file?name=[name].[ext]'
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/iframe/index.html',
            excludeChunks: ['snippet'],
            scriptLoading: "blocking",
            favicon: "src/favicon.ico"
        }),
        new ShakePlugin()
    ]
}
