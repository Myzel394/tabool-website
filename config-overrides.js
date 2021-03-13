const {alias} = require("react-app-rewire-alias");

module.exports = function override(config) {
    alias({
        "/": "src",
    })(config);

    config.output.publicPath = "/static/";

    return config;
};
