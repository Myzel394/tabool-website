import {useState} from "react";
import axios from "axios";
import {convertRawFields} from "utils";
import {useTranslation} from "react-i18next";

import {useEffectTask} from "./index";

export interface FieldOption {
    type: string;
    required: boolean;
    readOnly: boolean;
    label: string;

    helpText?: string;
    writeOnly?: boolean;

    minLength?: number;
    maxLength?: number;
}

export interface FieldOptions {
    [key: string]: FieldOption;
}

const useGetOptions = (url: string, fallback: FieldOptions = {}): [FieldOptions, boolean] => {
    const {t} = useTranslation();

    const [options, setOptions] = useState<{} | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffectTask(() => {
        // eslint-disable-next-line
        axios.options(url)
            .then(response => {
                console.log(response);
                const data = response.data?.actions?.POST;

                setOptions(
                    data ? convertRawFields(data) : null,
                );
            })
            .catch(() => setOptions(null))
            .finally(() => setIsLoading(false));

    }, [url], t("Informationen sammeln"), t("Informationen über das Formular werden gesammelt."));


    return [options || fallback, isLoading];
};

export default useGetOptions;
