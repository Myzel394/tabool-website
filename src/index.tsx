import React from "react";
import ReactDOM from "react-dom";
import "i18n";
import App from "App";
import axios from "axios";
import "react-app-polyfill/stable";

// Debug
axios.defaults.baseURL = "http://127.0.0.1:8000";
// eslint-disable-next-line no-console
console.warn("Debug is active. Edit index.tsx to remove this warning.");

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
);
