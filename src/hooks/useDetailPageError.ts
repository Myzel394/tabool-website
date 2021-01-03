import {AxiosError} from "axios";
import {useCallback, useContext} from "react";
import {ErrorContext} from "contexts";

import useSnackbar, {PredefinedMessageType} from "./useSnackbar";

export interface IUseDetailPageError {
    onFetchError: (error: AxiosError, containsData: boolean, message?: string) => void;
}

const useDetailPageError = (): IUseDetailPageError => {
    const {addError} = useSnackbar();
    const {dispatch: dispatchError} = useContext(ErrorContext);

    const onFetchError = useCallback((error: AxiosError, containsData: boolean, message?: string) => {
        if (containsData) {
            addError(error, undefined, PredefinedMessageType.ErrorLoading);
        } else {
            dispatchError({
                type: "setError",
                payload: {
                    status: error.response?.status,
                    message: message ?? error.response?.data.nonFieldErrors,
                },
            });
        }
    }, [addError, dispatchError]);


    return {
        onFetchError,
    };
};

export default useDetailPageError;
