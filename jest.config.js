const esModules = ["react-icons"].join("|");

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
    moduleDirectories: [
        "node_modules",
        "src",
    ],
};
