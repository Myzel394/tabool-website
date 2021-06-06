import React, {forwardRef, useContext, useImperativeHandle, useRef, useState} from "react";
import {IconButton, ListItem, ListItemIcon, ListItemSecondaryAction} from "@material-ui/core";
import {MdSettings} from "react-icons/all";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {Dayjs} from "dayjs";
import {ExtensionAvatar, LoadingOverlay} from "components";
import {useFileUpload} from "hooks";
import {ICreateStudentSubmissionData, useCreateStudentSubmission} from "hooks/apis";
import {getTextForState} from "hooks/useFileUpload";
import {AxiosError} from "axios";
import {StudentSubmissionDetail} from "types";

import SubmissionContext from "../SubmissionContext";
import {FileInformation} from "../../../../../../modules";

import SettingsModal from "./SettingsModal";
import {SubmissionUploadFile} from "./types";


export interface SingleFileProps {
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
}: SingleFileProps, reference) => {
    const {
        lesson,
        lessonDate,
        onSubmissionsChange,
    } = useContext(SubmissionContext);
    const {t} = useTranslation();

    const $warningContainer = useRef<any>();

    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

    const sendSubmission = useCreateStudentSubmission();

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
        errorMessage,
        isUploaded,
        upload,
        readFile,
        isDoingAnything,
        progress = 0,
    } = useFileUpload<StudentSubmissionDetail, AxiosError, ICreateStudentSubmissionData>(
        file.nativeFile,
        sendSubmission,
        undefined,
        {
            onSuccess: newSubmission => onSubmissionsChange(oldSubmissions => [
                ...oldSubmissions,
                newSubmission,
            ]),
        },
    );

    useImperativeHandle(reference, () => ({
        isCompressing,
        isUploading,
        nativeFile: file.nativeFile,
        upload: async () => {
            const loadedFile = await readFile();

            return upload({
                name,
                lessonDate,
                file: loadedFile,
                publishDatetime,
                lessonId: lesson.id,
            });
        },
    }));

    if (isUploaded) {
        return null;
    }

    return (
        <LoadingOverlay
            isLoading={isDoingAnything}
            text={getTextForState({
                isReadingFile,
                isProcessing,
                isUploaded,
                isUploading,
                isCompressing,
                isPreparingUpload,
            }, t)}
            value={[1, 0].includes(progress) ? undefined : progress * 100}
        >
            <ListItem>
                <ListItemIcon onClick={onRemove}>
                    <ExtensionAvatar name={name} />
                </ListItemIcon>
                <FileInformation
                    maxLength={maxLength}
                    filename={name}
                    course={lesson.course}
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
