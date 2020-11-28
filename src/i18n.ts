import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import german from "languages/de.json";
import detector from "i18next-browser-languagedetector";


const resources = {
    de: german,
};

i18n
    .use(detector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "de",

        nsSeparator: false,
        keySeparator: false,
        fallbackLng: false,

        interpolation: {
            escapeValue: false,
        },
        saveMissing: true,
    });

export default i18n;
