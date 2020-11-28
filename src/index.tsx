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
import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("de");
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
);
