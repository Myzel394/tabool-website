import {AxiosError} from "axios";
import {useCallback, useContext} from "react";

import {ErrorContext} from "../contexts";

import {PredefinedMessageType} from "./useSnackbar";

import {useSnackbar} from "./index";

export interface IUseDetailPageError {
    onFetchError: (error: AxiosError, containsData: boolean) => void;
}

const useDetailPageError = (): IUseDetailPageError => {
    const {addError} = useSnackbar();
    const {dispatch: dispatchError} = useContext(ErrorContext);

    const onFetchError = useCallback((error: AxiosError, containsData: boolean) => {
        if (containsData) {
            addError(error, undefined, PredefinedMessageType.ErrorLoading);
        } else {
            dispatchError({
                type: "setError",
                payload: {
                    status: error.code,
                    message: error.message,
                },
            });
        }
    }, [addError, dispatchError]);


    return {
        onFetchError,
    };
};

export default useDetailPageError;
