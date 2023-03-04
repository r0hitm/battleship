const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: "./js/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "public"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./html/index.html",
            scriptLoading: "defer",
            favicon: "./img/favicon.png",
        }),

        new MiniCssExtractPlugin(),

        new CssMinimizerPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
            },
            {
                test: /\.html$/i,
                use: "html-loader",
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
                type: "asset/resource",
                generator: {
                    filename: "img/[name]-[hash][ext]",
                },
            },
            {
                test: /\.json$/i,
                use: "json-loader",
                type: "javascript/auto",
            }
        ],
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },
};