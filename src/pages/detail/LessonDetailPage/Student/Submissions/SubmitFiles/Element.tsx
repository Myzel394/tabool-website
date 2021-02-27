import React, {Dispatch, forwardRef, SetStateAction, useImperativeHandle, useRef, useState} from "react";
import {IconButton, ListItem, ListItemIcon, ListItemSecondaryAction} from "@material-ui/core";
import {ExtensionAvatar, LoadingOverlay} from "components";
import {MdSettings} from "react-icons/all";
import {useMutation} from "react-query";
import {useTranslation} from "react-i18next";
import compressImage from "browser-image-compression";
import {Alert} from "@material-ui/lab";
import {ICreateStudentSubmissionData, useCreateStudentSubmission} from "hooks/apis";
import {StudentLessonDetail, StudentSubmissionDetail} from "types";
import {Dayjs} from "dayjs";
import {AxiosError} from "axios";

import SettingsModal from "../SettingsModal";
import FileInformation from "../FileInformation";


export interface IElement {
    submissions: StudentSubmissionDetail[];
    onSubmissionsChange: Dispatch<SetStateAction<StudentSubmissionDetail[]>>;
    lesson: StudentLessonDetail;
    lessonDate: Dayjs;

    publishDatetime: Dayjs | null;

    nativeFile: File;
    compressImages: boolean;
    onPublishDatetimeChange: (newDate: Dayjs | null) => void;
    onDone: () => any;
    onDelete: () => any;
}


const options = {
    maxSizeMB: 1,
    useWebWorker: true,
};

const Element = ({
    onPublishDatetimeChange,
    nativeFile,
    onDone,
    compressImages,
    onDelete,
    lesson,
    lessonDate,
    onSubmissionsChange,
    submissions,
    publishDatetime,
}: IElement, ref) => {
    const {t} = useTranslation();
    const sendSubmission = useCreateStudentSubmission();

    const $warningContainer = useRef<any>();
    const $isUploading = useRef<boolean>(false);

    const [uploadProgress, setUploadProgress] = useState<number>();
    const [progress, setProgress] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [isCompressing, setIsCompressing] = useState<boolean>(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const {
        mutate,
        isLoading,
    } = useMutation<StudentSubmissionDetail, AxiosError, ICreateStudentSubmissionData>(
        variables => sendSubmission(variables, setUploadProgress),
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
        isUploading: $isUploading.current,
        upload: async () => {
            let file: Blob | null = null;

            // Reset
            $isUploading.current = true;
            setErrorMessage(undefined);

            // Image compressing
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

            setUploadProgress(undefined);
            $isUploading.current = false;

            if (file) {
                mutate({
                    file,
                    name,
                    lessonDate,
                    publishDatetime,
                    lessonId: lesson.id,
                });
            }
        },
    }));

    return (
        <LoadingOverlay
            isLoading={isLoading || isCompressing}
            text={isCompressing ? t("Bild wird komprimiert") : t("Bild wird hochgeladen")}
            value={isCompressing ? progress : uploadProgress}
        >
            <ListItem>
                <ListItemIcon onClick={onDelete}>
                    <ExtensionAvatar name={nativeFile.name} />
                </ListItemIcon>
                <FileInformation
                    filename={nativeFile.name}
                    lesson={lesson}
                    uploadDate={publishDatetime}
                    size={nativeFile.size}
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
            {errorMessage &&
            <Alert severity="error">
                {errorMessage}
            </Alert>
            }
            <SettingsModal
                publishDatetime={publishDatetime}
                isOpen={isSettingsOpen}
                lesson={lesson}
                onPublishDatetimeChange={onPublishDatetimeChange}
                onClose={() => setIsSettingsOpen(false)}
            />
        </LoadingOverlay>
    );
};

export default forwardRef(Element);
