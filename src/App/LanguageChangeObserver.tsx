import {useEffect} from "react";
import i18n from "i18next";
import {observeStore} from "utils";
import {getLanguage, RootState} from "states";
import {AvailableLanguages} from "types";
import {useSelector} from "react-redux";

const LanguageChangeObserver = () => {
    const language = useSelector<RootState>(getLanguage) as AvailableLanguages;

    // Upload preference
    useEffect(() => {
        const unsubscribe = observeStore<RootState, AvailableLanguages>(
            () =>
                i18n.changeLanguage(language)
            ,
            {
                select: getLanguage,
                initialCall: false,
            },
        );

        return unsubscribe;
    }, [language]);

    return null;
};

export default LanguageChangeObserver;
