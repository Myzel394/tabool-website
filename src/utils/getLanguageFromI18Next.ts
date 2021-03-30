import i18next from "i18next";

const getLanguageFromI18Next = (): string => {
    const savedValue = i18next.language || window.localStorage.i18nextLng;

    if (!savedValue || savedValue === "_automatic") {
        return "de";
    }
    return savedValue;
};

export default getLanguageFromI18Next;
