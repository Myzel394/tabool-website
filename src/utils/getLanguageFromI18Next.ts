import i18next from "i18next";

const getLanguageFromI18Next = (): string => i18next.language || window.localStorage.i18nextLng;

export default getLanguageFromI18Next;
