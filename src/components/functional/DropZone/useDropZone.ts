import {DropzoneInputProps, DropzoneRootProps, DropzoneState, useDropzone as useReactDropZone} from "react-dropzone";
import {useSnackbar} from "hooks";
import {useTranslation} from "react-i18next";
import {ButtonBase} from "@material-ui/core";

export interface UseDropZoneData {
    onFilesAdded: (files: File[]) => any;
    disabled?: boolean;
}

export interface UseDropZoneResult {
    rootProps: DropzoneRootProps;
    inputProps: DropzoneInputProps;
    isDragActive: DropzoneState["isDragActive"];
}

// 50 MB
export const MAX_FILE_SIZE = 1000 * 1000 * 50;

const useDropZone = ({
    onFilesAdded,
    disabled,
}: UseDropZoneData): UseDropZoneResult => {
    const {t} = useTranslation();
    const {
        addError,
    } = useSnackbar();
    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useReactDropZone({
        getFilesFromEvent: async (event) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const originalFiles = (event.dataTransfer ? event.dataTransfer.files : event.target.files) as FileList;

            if (originalFiles === undefined) {
                return [];
            }

            const filteredFiles = Array
                .from(originalFiles)
                .filter(file => file.size <= MAX_FILE_SIZE);

            if (originalFiles.length === 1 && filteredFiles.length === 0) {
                addError(undefined, t("Diese Datei ist zu groß zum Hochladen."));
                return [];
            } else if (originalFiles.length > filteredFiles.length) {
                addError(undefined, t("{{count}} Dateien sind zu groß zum Hochladen.", {
                    count: originalFiles.length - filteredFiles.length,
                }));
            }

            onFilesAdded(filteredFiles);
            return filteredFiles;
        },
    });

    return {
        isDragActive,
        rootProps: getRootProps({
            component: disabled ? "div" : ButtonBase,
            style: {
                width: "100%",
            },
        }),
        inputProps: getInputProps(),
    };
};

export default useDropZone;
