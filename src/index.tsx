import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import "i18n";
import App from "App";
import "react-app-polyfill/stable";
import "dayjs/locale/de";
import "animate.css";
import "./extends/dayjs";
import "./extends/immutability-helper";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
);
