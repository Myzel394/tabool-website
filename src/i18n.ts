import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import german from "languages/de.json";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";


const resources = {
    de: german,
};

i18n
    .use(detector)
    .use(backend)
    .use(initReactI18next)
    .init({
        resources,
        lng: "de",

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
