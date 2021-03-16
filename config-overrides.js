const {alias} = require("react-app-rewire-alias");

module.exports = function override(config) {
    alias({
        "/": "src",
    })(config);

    if (process.env.NODE_EN === "production") {
        config.output.publicPath = "/static/";
    }


    return config;
};
