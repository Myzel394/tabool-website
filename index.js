const fs = require("fs");

const loader = require("@assemblyscript/loader");

const imports = {};
const wasmModule = loader.instantiateSync(fs.readFileSync(`${__dirname}/build/optimized.wasm`), imports);
module.exports = wasmModule.exports;
