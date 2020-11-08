import React from "react";
import ReactDOM from "react-dom";
import "i18n";
import App from "App";

import "react-app-polyfill/stable";
import "animate.css";

const container = document.getElementById("root");

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    container,
);
