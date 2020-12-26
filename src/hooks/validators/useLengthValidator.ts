import {useCallback} from "react";
import {useTranslation} from "react-i18next";
import {ValidationFunction} from "types/validators";

const useLengthValidator = (minLength, maxLength): ValidationFunction => {
    const {t} = useTranslation();

    return useCallback((value: string) => {
        const length = value?.length ?? 0;

        if (length < minLength) {
            return t("Stelle sicher dass dieses Feld mindestens {{minLength}} Zeichen lang ist", {
                minLength,
            });
        } else if (length > maxLength) {
            return t("Stelle sicher, dass dieses Feld nicht länger als {{maxLength}} Zeichen lang ist", {
                maxLength,
            });
        }

    }, [t, minLength, maxLength]);
};

export default useLengthValidator;
