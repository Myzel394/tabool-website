import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import "i18n";
import App from "App";
import dayjs from "dayjs";
import "react-app-polyfill/stable";
import "dayjs/locale/de";
import "animate.css";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.locale("de");
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
);
