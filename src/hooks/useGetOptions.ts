import {useEffect, useState} from "react";
import {fetchOptions} from "api/forms";

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
    [key: string]: FieldOptions;
}

/**
 * Loads form data
 * @param url: string - The url
 * @param fallback
 */
const useGetOptions = (url: string, fallback = {}): [object, boolean] => {
    const [options, setOptions] = useState<{} | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            let fieldOptions;

            try {
                fieldOptions = await fetchOptions(url);
            } catch (e) {
                setOptions(fallback);
            } finally {
                setIsLoading(false);
            }

            if (fieldOptions) {
                setOptions(fieldOptions);
            }
        };

        fetchData();
    }, [url]);


    return [options || fallback, isLoading];
};

export default useGetOptions;
