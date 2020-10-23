import {useCallback} from "react";
import {useTranslation} from "react-i18next";
import {ValidationFunction} from "types/validators";
import validators from "common-validators";

export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const usePasswordVerification = (): ValidationFunction => {
    const {t} = useTranslation();

    return useCallback((value: string) => {
        if (validators.pattern(value, PASSWORD_REGEX)) {
            return t(
                "Das Passwort ist nicht sicher genug " +
                "(Es muss ein Sonderzeichen haben, eine Zahl, Groß- und Kleinbuchstaben, mindestens 8 Zeichen)",
            );
        }
    }, [t]);
};

export default usePasswordVerification;
