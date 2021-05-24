import {useCallback} from "react";
import prettyBytes from "pretty-bytes";

import {getLanguageFromI18Next} from "../utils";

type ReturnFunction = (bytes: number, options?: prettyBytes.Options) => string;

const usePrettyBytes = (): ReturnFunction => {
    const func = useCallback((bytes: number, options?: prettyBytes.Options) => {
        const language = getLanguageFromI18Next();

        return prettyBytes(bytes, {
            locale: language,
            ...options,
        });
    }, []);

    return func;
};

export default usePrettyBytes;
