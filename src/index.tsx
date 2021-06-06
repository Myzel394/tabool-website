import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import "i18n";
import "react-app-polyfill/stable";
import App from "App";
import "dayjs/locale/de";
import "./extensions/dayjs";
import "./extensions/immutability-helper";
import "./extensions/yup";
import "./supports";
import "./firebase";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
);
