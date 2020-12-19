import React, {memo, useContext, useState} from "react";
import {DropZone, LoadingOverlay, PrimaryButton} from "components";
import {List, Typography} from "@material-ui/core";
import update from "immutability-helper";
import dayjs, {Dayjs} from "dayjs";
import {useMutation} from "react-query";
import {ISendSubmissionData, ISendSubmissionResponse, SingleData, useSendSubmissionAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {getISODatetime} from "utils";
import {useTranslation} from "react-i18next";
import {useSnackbar} from "hooks";

import LessonContext from "../LessonContext";

import SubmissionElement from "./SubmissionElement";

interface SubmissionUploadFile {
    nativeFile: File;
    uploadDate: Dayjs | null;
}

const SubmitFiles = () => {
    const {lesson} = useContext(LessonContext);
    const {t} = useTranslation();
    const sendFiles = useSendSubmissionAPI();
    const {addError} = useSnackbar();

    const [files, setFiles] = useState<SubmissionUploadFile[]>([]);
    const {
        mutate,
        isLoading,
    } = useMutation<ISendSubmissionResponse, AxiosError, ISendSubmissionData>(
        sendFiles,
        {
            onError: error => {
                addError(error, undefined, PredefinedMessageType.ErrorUploading);
            },
            onSuccess: () => setFiles([]),
        },
    );

    const uploadFiles = () => {
        mutate(
            files
                .filter(file => file.nativeFile !== undefined)
                .map((file): SingleData => ({
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore: Files with no nativeFile are filtered out above
                    file: file.nativeFile,
                    lessonId: lesson.id,
                    uploadAt: file.uploadDate ? getISODatetime(file.uploadDate) : null,
                })),
        );
    };

    return (
        <LoadingOverlay isLoading={isLoading}>
            <DropZone<SubmissionUploadFile>
                value={files}
                renderList={(files) =>
                    <>
                        <List>
                            {files.map((file, index) =>
                                <SubmissionElement
                                    key={`submission_add_${file.nativeFile.name}_${file.nativeFile.size}_${file.nativeFile?.type}_${file.uploadDate?.toISOString?.()}`}
                                    filename={file.nativeFile.name}
                                    fileSize={file.nativeFile.size}
                                    fileSettings={{
                                        uploadDate: file.uploadDate,
                                    }}
                                    onSettingsChange={newSettings => setFiles(prevState => update(prevState, {
                                        [index]: {
                                            uploadDate: {
                                                $set: newSettings.uploadDate,
                                            },
                                        },
                                    }))}
                                    onDelete={() => setFiles(prevState => update(prevState, {
                                        $splice: [
                                            [index, 1],
                                        ],
                                    }))}
                                />)}
                        </List>
                        <PrimaryButton onClick={uploadFiles}>
                            {t("Auf tabool hochladen")}
                        </PrimaryButton>
                        <Typography variant="body2" color="textSecondary">
                            {t("Tippe auf ein Element, um es zu entfernen.")}
                        </Typography>
                    </>
                }
                onChange={(newFiles) => {
                    setFiles(prevState => [
                        ...prevState,
                        ...Array.from(newFiles).map(file => ({
                            name: file.name,
                            size: file.size,
                            nativeFile: file,
                            uploadDate: dayjs(),
                        })),
                    ]);
                }}
            />
        </LoadingOverlay>
    );
};

export default memo(SubmitFiles);
