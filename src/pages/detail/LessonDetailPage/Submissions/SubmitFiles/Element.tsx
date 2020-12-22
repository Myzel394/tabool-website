import React, {forwardRef, useContext, useImperativeHandle, useState} from "react";
import {IconButton, ListItem, ListItemIcon, ListItemSecondaryAction} from "@material-ui/core";
import {ExtensionAvatar, LoadingOverlay} from "components";
import {MdSettings} from "react-icons/all";
import {useMutation} from "react-query";
import {ISendSubmissionData, ISendSubmissionResponse, useSendSubmissionAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {useTranslation} from "react-i18next";
import compressImage from "browser-image-compression";
import {Alert} from "@material-ui/lab";
import {getISODatetime} from "utils";

import SettingsModal, {Settings} from "../SettingsModal";
import FileInformation from "../FileInformation";
import SubmissionsContext from "../SubmissionsContext";


export interface IElement {
    settings: Settings;
    nativeFile: File;
    compressImages: boolean;
    onSettingsChange: (settings: Settings) => any;
    onDone: () => any;
    onDelete: () => any;
}


const options = {
    maxSizeMB: 1,
    useWebWorker: true,
};

const Element = ({
    onSettingsChange,
    settings,
    nativeFile,
    onDone,
    compressImages,
    onDelete,
}: IElement, ref) => {
    const {t} = useTranslation();
    const {submissions, onSubmissionsChange, lesson} = useContext(SubmissionsContext);
    const sendSubmission = useSendSubmissionAPI();

    const [progress, setProgress] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [isCompressing, setIsCompressing] = useState<boolean>(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

    const {
        mutate,
        isLoading,
    } = useMutation<ISendSubmissionResponse, AxiosError, ISendSubmissionData>(
        sendSubmission,
        {
            onSuccess: (newSubmission) => {
                onSubmissionsChange([
                    ...submissions,
                    newSubmission,
                ]);
                onDone();
            },
            onError: error => setErrorMessage(error.message),
        },
    );

    useImperativeHandle(ref, () => ({
        upload: async () => {
            let file: Blob | null = null;

            // Reset
            setErrorMessage(undefined);

            if (compressImages && nativeFile.type.startsWith("image")) {
                setIsCompressing(true);
                try {
                    file = await compressImage(nativeFile, {
                        ...options,
                        onProgress: setProgress,
                    });
                } catch (catchEvent) {
                    setErrorMessage(t("Das Bild konnte nicht komprimiert werden."));
                } finally {
                    setIsCompressing(false);
                }
            } else {
                try {
                    const arrayBuffer = await nativeFile.arrayBuffer();
                    file = new Blob([arrayBuffer], {
                        type: nativeFile.type,
                    });
                } catch (catchEvent) {
                    setErrorMessage(t("Die Datei konnte nicht gelesen werden."));
                }
            }

            if (file) {
                mutate({
                    file,
                    uploadDate: settings.uploadDate ? getISODatetime(settings.uploadDate) : null,
                    lessonId: lesson.id,
                });
            }
        },
    }));

    return (
        <LoadingOverlay
            isLoading={isLoading || isCompressing}
            text={isCompressing ? t("Bild wird komprimiert") : t("Bild wird hochgeladen")}
            value={isCompressing ? progress : undefined}
        >
            <ListItem
                button
                onClick={onDelete}
            >
                <ListItemIcon>
                    <ExtensionAvatar name={nativeFile.name} />
                </ListItemIcon>
                <FileInformation
                    filename={nativeFile.name}
                    uploadDate={settings.uploadDate}
                    size={nativeFile.size}
                />
                <ListItemSecondaryAction>
                    <IconButton onClick={() => setIsSettingsOpen(true)}>
                        <MdSettings />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            {errorMessage &&
                <Alert severity="error">
                    {errorMessage}
                </Alert>
            }
            <SettingsModal
                value={settings}
                isOpen={isSettingsOpen}
                onChange={onSettingsChange}
                onClose={() => setIsSettingsOpen(false)}
            />
        </LoadingOverlay>
    );
};

export default forwardRef(Element);
