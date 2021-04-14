// Template for webpack.config.js in Fable projects
// In most cases, you'll only need to edit the CONFIG object (after dependencies)
// See below if you need better fine-tuning of Webpack options

// Dependencies. Also required:
// core-js,sass, sass-loader, css-loader, style-loader, file-loader
var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { config } = require("webpack");

var projectDir = './src/Client';

var CONFIG = {
    // The tags to include the generated JS and CSS will be automatically injected in the HTML template
    // See https://github.com/jantimon/html-webpack-plugin
    fsharpEntry: projectDir + '/build/Index.js',
    outputDir: projectDir + '/deploy',
    assetsDir: projectDir + '/public',
    devServerPort: 8080,
    // When using webpack-dev-server, you may need to redirect some calls
    // to a external API server. See https://webpack.js.org/configuration/dev-server/#devserver-proxy
    devServerProxy: {
        '/**': {
            // assuming the suave server is running on port 8083
            target: "http://localhost:5000",
            changeOrigin: true
        }
    }
}

// If we're running webpack serve, assume we're in development mode
var isProduction = !process.argv.find(v => v.indexOf('serve') !== -1);

const isDevelopment = !isProduction && process.env.NODE_ENV !== 'production';

console.log("Bundling for " + (isProduction ? "production" : "development") + "...");

var commonPlugins = [
    new Dotenv({
        path: "./.env",
        silent: false,
        systemvars: true
    })
];

module.exports = {
    mode: isProduction ? "production" : "development",
    entry: CONFIG.fsharpEntry,
    output: {
        path: path.join(__dirname, CONFIG.outputDir),
        filename: isProduction ? '[name].js' : '[name].js', //"bundle.js",
    },
    devtool: isProduction ? "source-map" : "eval-source-map",
    devServer: {
        publicPath: "/",
        contentBase: CONFIG.assetsDir,
        port: 8080,
        proxy: CONFIG.devServerProxy,
        hot: true,
        inline: true
    },
    plugins: isProduction ?
        commonPlugins.concat([
            new MiniCssExtractPlugin({ filename: 'style.css' }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: resolve(CONFIG.assetsDir) }
                ]
            }),
        ])
        : commonPlugins.concat([
            new ReactRefreshWebpackPlugin()
        ]),
    optimization: {
        // Split the code coming from npm packages into a different file.
        // 3rd party dependencies change less often, let the browser cache them.
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /node_modules/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        },
    },

    // - sass-loaders: transforms SASS/SCSS into JS
    // - file-loader: Moves files referenced in the code (fonts, images) into output folder
    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/,
                exclude: /global.scss/,
                use: [
                    isProduction
                        ? MiniCssExtractPlugin.loader
                        : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { implementation: require("sass") }
                    }
                ],
            },
            {
                test: /\.(sass|scss|css)$/,
                include: /global.scss/,
                use: [
                    isProduction
                        ? MiniCssExtractPlugin.loader
                        : 'style-loader',
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: { implementation: require("sass") }
                    }
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*)?$/,
                use: ["file-loader"]
            }
        ]
    }
};

function resolve(filePath) {
    return path.isAbsolute(filePath) ? filePath : path.join(__dirname, filePath);
}


