import {OptionsObject, ProviderContext, SnackbarMessage, useSnackbar as notistackUseSnackbar} from "notistack";
import {AxiosError} from "axios";
import {useCallback} from "react";
import {useTranslation} from "react-i18next";

export enum PredefinedMessageType {
    ErrorLoading,
    ErrorMutating,
    ErrorUploading,
}

export interface IUseSnackbar {
    addError: (error?: AxiosError, message?: string, predefinedMessage?: PredefinedMessageType) => any;
    addWarning: (message: string) => any;
    addSuccess: (message: string) => any;
    addSnackbar: ProviderContext["enqueueSnackbar"];
    closeSnackbar: ProviderContext["closeSnackbar"];
}

const useSnackbar = (): IUseSnackbar => {
    const {t} = useTranslation();
    const {enqueueSnackbar, closeSnackbar} = notistackUseSnackbar();
    const addSnackbar = useCallback((message: SnackbarMessage, options?: OptionsObject) =>
        enqueueSnackbar(message, {
            ...options,
            preventDuplicate: true,
        })
    , [enqueueSnackbar]);

    const addError = useCallback<IUseSnackbar["addError"]>((
        error,
        message = "",
        predefinedMessage,
    ) => {
        let snackbarMessage = message;

        switch (predefinedMessage) {
            case PredefinedMessageType.ErrorLoading:
                snackbarMessage = t("Es gab einen Fehler beim Laden der Daten.");
                break;
            case PredefinedMessageType.ErrorMutating:
                snackbarMessage = t("Es gab einen Fehler beim Updaten der Daten.");
                break;
            case PredefinedMessageType.ErrorUploading:
                snackbarMessage = t("Es gab einen Fehler beim Hochladen der Daten.");
                break;
        }

        if (error) {
            const errorMessage = error.response?.data?.nonFieldErrors?.join("; ") ?? error.message;

            snackbarMessage = `${snackbarMessage} (${errorMessage})`;
        }

        addSnackbar(snackbarMessage, {
            variant: "error",
        });
    }, [addSnackbar, t]);
    const addWarning = useCallback(message => addSnackbar(message, {
        variant: "warning",
    }), [addSnackbar]);
    const addSuccess = useCallback(message => addSnackbar(message, {
        variant: "success",
    }), [addSnackbar]);

    return {
        addError,
        addSnackbar,
        addSuccess,
        addWarning,
        closeSnackbar,
    };
};

export default useSnackbar;
