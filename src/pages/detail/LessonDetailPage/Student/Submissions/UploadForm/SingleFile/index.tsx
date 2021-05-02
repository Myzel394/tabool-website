import React, {forwardRef, useContext, useRef, useState} from "react";
import {IconButton, ListItem, ListItemIcon, ListItemSecondaryAction} from "@material-ui/core";
import {MdSettings} from "react-icons/all";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {Dayjs} from "dayjs";
import {ExtensionAvatar, LoadingOverlay} from "components";

import {SubmissionUploadFile} from "../types";
import SubmissionContext from "../../SubmissionContext";
import FileInformation from "../../FileInformation";
import SettingsModal from "../../SettingsModal";

import useFileUpload from "./useFileUpload";


export interface ISingleFile {
    file: SubmissionUploadFile;
    compressImage: boolean;

    onRemove: () => any;
    onFileChange: (newFile: SubmissionUploadFile) => any;

    maxLength?: number;
}

const SingleFile = ({
    compressImage,
    file,
    onFileChange,
    onRemove,
    maxLength,
}: ISingleFile, reference) => {
    const {
        lesson,
    } = useContext(SubmissionContext);
    const {t} = useTranslation();

    const $warningContainer = useRef<any>();

    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

    // File
    const {name, publishDatetime} = file;
    const updateParent = (newData: Partial<SubmissionUploadFile>) => onFileChange({
        nativeFile: file.nativeFile,
        name: file.name,
        publishDatetime: file.publishDatetime,
        ...newData,
    });
    const setName = (newName: string) => updateParent({name: newName});
    const setPublishDatetime = (newPublishDatetime: Dayjs | null) => updateParent({publishDatetime: newPublishDatetime});

    const {
        isUploading,
        isCompressing,
        isPreparingUpload,
        isReadingFile,
        isProcessing,
        progress,
        errorMessage,
        isUploaded,
    } = useFileUpload({
        nativeFile: file.nativeFile,
        compressImage,
        reference,
        name,
        publishDatetime,
    });

    if (isUploaded) {
        return null;
    }

    return (
        <LoadingOverlay
            isLoading={isUploading || isCompressing || isPreparingUpload || isProcessing || isReadingFile}
            text={(() => {
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
            })()}
            value={[1, 0].includes(progress) ? undefined : progress * 100}
        >
            <ListItem>
                <ListItemIcon onClick={onRemove}>
                    <ExtensionAvatar name={name} />
                </ListItemIcon>
                <FileInformation
                    maxLength={maxLength}
                    filename={name}
                    lesson={lesson}
                    uploadDate={publishDatetime}
                    size={file.nativeFile.size}
                    warningContainer={$warningContainer.current}
                    onFilenameChange={setName}
                />
                <ListItemSecondaryAction>
                    <IconButton onClick={() => setIsSettingsOpen(true)}>
                        <MdSettings />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <div ref={$warningContainer} />
            {errorMessage && (
                <Alert severity="error">
                    {errorMessage}
                </Alert>
            )}
            <SettingsModal
                publishDatetime={publishDatetime}
                isOpen={isSettingsOpen}
                lesson={lesson}
                onPublishDatetimeChange={setPublishDatetime}
                onClose={() => setIsSettingsOpen(false)}
            />
        </LoadingOverlay>
    );
};

export default forwardRef(SingleFile);
