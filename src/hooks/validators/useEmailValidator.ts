import {useCallback} from "react";
import {useTranslation} from "react-i18next";
import validators from "common-validators";
import {ValidationFunction} from "types/validators";

const useEmailValidator = (): ValidationFunction => {
    const {t} = useTranslation();

    return useCallback((value: string) => {
        if (validators.email(value)) {
            return t("Diese E-Mail-Adresse ist nicht gültig");
        }
    }, [t]);
};

export default useEmailValidator;
