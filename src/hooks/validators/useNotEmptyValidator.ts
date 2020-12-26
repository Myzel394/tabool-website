import {useCallback} from "react";
import {useTranslation} from "react-i18next";
import {ValidationFunction} from "types/validators";

const useNotEmptyValidator = (): ValidationFunction => {
    const {t} = useTranslation();

    return useCallback((value: string) => {
        if (value === "" || value === undefined) {
            return t("Stelle sicher, dass dieses Feld nicht leer ist");
        }
    }, [t]);
};

export default useNotEmptyValidator;
