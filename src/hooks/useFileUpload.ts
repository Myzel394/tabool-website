import {UseMutateAsyncFunction, useMutation} from "react-query";
import {TFunction} from "i18next";
import {UseMutationOptions} from "react-query/types/react/types";

import useReadFile, {UseReadFileOptions} from "./useReadFile";
import useQueryOptions from "./useQueryOptions";
import useInheritedState from "./useInheritedState";

export interface UseFileUploadResponseStates {
    isUploading: boolean;
    isProcessing: boolean;
    isPreparingUpload: boolean;
    isCompressing: boolean;
    isReadingFile: boolean;
    isUploaded: boolean;
}

export interface UseFileUploadResponse<Data, Error, Variables> extends UseFileUploadResponseStates {
    progress?: number;
    errorMessage?: string;

    readFile: () => Promise<Blob>;
    upload: UseMutateAsyncFunction<Data, Error, Variables>;

    isDoingAnything: boolean;
}

export const getTextForState = ({
    isCompressing,
    isPreparingUpload,
    isProcessing,
    isReadingFile,
    isUploaded,
    isUploading,
}: UseFileUploadResponseStates, t: TFunction): string => {
    if (isReadingFile) {
        return t("Datei wird gelesen");
    } else if (isPreparingUpload) {
        return t("Hochladen wird vorbereitet");
    } else if (isCompressing) {
        return t("Bild wird komprimiert");
    } else if (isUploading) {
        return t("Datei wird hochgeladen");
    } else {
        return t("Datei wird vom Server verarbeitet");
    }
};

const useFileUpload = <Data, Error, Variables>(
    file: File,
    requestFn: (variables: Variables, setProgressFn: ((newProgress: number) => any)) => Promise<Data>,
    useFileOptions?: Partial<UseReadFileOptions>,
    queryOptions?: UseMutationOptions<Data, Error, Variables>,
): UseFileUploadResponse<Data, Error, Variables> => {
    const defaultQueryOptions = useQueryOptions();
    const {
        isReadingFile,
        isCompressing,
        readFile,
        progress: readFileProgress,
        errorMessage: readFileErrorMessage,
    } = useReadFile(file, useFileOptions);

    const [errorMessage, setErrorMessage] = useInheritedState<string | undefined>(readFileErrorMessage);
    const [progress, setProgress] = useInheritedState<number | undefined>(readFileProgress);

    const {
        mutateAsync,
        isLoading,
        isSuccess: isUploaded,
    } = useMutation<Data, Error, Variables>(
        variables => requestFn(variables, setProgress),
        {
            onMutate: () => setErrorMessage(undefined),
            onError: error => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const errorMessage = error?.response?.data?.file ?? error?.message;

                if (errorMessage) {
                    setErrorMessage(errorMessage);
                } else {
                    console.warn("Error message couldn't be found, please provide your own `onError` function in the queryOptions.");
                }
            },
            ...(queryOptions || defaultQueryOptions),
        },
    );

    const isUploading = progress !== 1 && progress !== 0 && isLoading;
    const isProcessing = progress === 1 && isLoading;
    const isPreparingUpload = progress === undefined && isLoading;

    return {
        isUploading,
        isProcessing,
        isPreparingUpload,
        isCompressing,
        isReadingFile,
        isUploaded,
        isDoingAnything: isUploading || isPreparingUpload || isPreparingUpload || isCompressing || isReadingFile || isProcessing,

        progress,
        errorMessage,

        readFile,
        upload: mutateAsync,
    };
};

export default useFileUpload;
