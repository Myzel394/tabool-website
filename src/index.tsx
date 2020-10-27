import React from "react";
import ReactDOM from "react-dom";
import "i18n";
import App from "App";
import axios from "axios";

import "react-app-polyfill/stable";
import "animate.css";

export const DEBUG = true;

const container = document.getElementById("root");

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    container,
);

if (DEBUG) {
    axios.defaults.baseURL = "http://127.0.0.1:8000";
    // eslint-disable-next-line no-console
    console.warn("Debug is active. Edit InputWithIcon.tsx to remove this warning.");
}
