const path = require("path");

const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const {alias} = require("react-app-rewire-alias");

module.exports = function override(config) {
    alias({
        "/": "src",
    })(config);

    if (process.env.NODE_ENV === "production") {
        config.plugins = [
            ...(config.plugins ?? []),
            new WorkboxWebpackPlugin.InjectManifest({
                swSrc: path.join(process.cwd(), "./src/service-worker.js"),
                swDest: "sw.js",
            }),
            new LodashModuleReplacementPlugin(),
        ];
    }

    config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
    });

    return config;
};
