import {AxiosError} from "axios";
import {useCallback, useContext} from "react";
import {ErrorContext} from "contexts";
import {canCastToNumber} from "utils";

import useSnackbar, {PredefinedMessageType} from "./useSnackbar";

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
                    status: (error.code && canCastToNumber(error.code)) ? Number(error.code) : undefined,
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
