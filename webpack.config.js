// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require("webpack");
const dotenv = require("dotenv");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = () => {
    // call dotenv and it will return an Object with a parsed key
    const env = dotenv.config().parsed;

    // reduce it to a nice object, the same as before
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new WorkboxWebpackPlugin.InjectManifest({
                swSrc: "./src/service-worker.js",
                swDest: "sw.js",
            }),
        ],
    };
};
