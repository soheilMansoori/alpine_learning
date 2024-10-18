const path = require("node:path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

// create MPA project with webpack 
module.exports = {
    // mode
    mode: "development",
    // entry file 
    entry: {
        app: "./src/app.js",
        login: "./src/login.js"
    },
    // output file
    output: {
        // path.resole is node js code or can write path.join
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].js", // hash file
        clean: true // remove not useful files and clean dist folder
    },
    // dev server
    devServer: {
        static: {
            directory: path.resolve(__dirname, "./pages"),
        },
        compress: false,
        open: true,
        port: 4000,
    },
    // plugins
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles/[name].css" // go in to the and create file dist/styles/main.css and hash file
        }),
        new HtmlWebpackPlugin(
            {
                template: "/pages/index.html",
                minify: true,
                filename: "index.html",
                chunks: ["app"]
            }
        ),
        new HtmlWebpackPlugin(
            {
                template: "/pages/login.html",
                minify: true,
                filename: "login.html",
                chunks: ["login"]
            }
        )
    ],
    // loaders
    module: {
        rules: [
            // add css modules 
            {
                test: /\.css$/i, // regex
                use: [MiniCssExtractPlugin.loader, "css-loader"] // ["plugins" ,"1" , "0"]
            },
            // add png svg png jpg jpeg modules
            {
                test: /\.(png|jpg|svg|gif|jpeg)$/i, // regex
                type: "asset/resource"
            },
            // add fonts modules
            {
                test: /\.(woff|woff2|eot|ttf|tof)$/i, // regex
                type: "asset/resource"
            },
            // add babel modules
            {
                test: /\.(?:js|mjs|cjs)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "ie 11" }]
                        ]
                    }
                }
            }
        ]
    },
    // optimization
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin(),
        ],
    },
}