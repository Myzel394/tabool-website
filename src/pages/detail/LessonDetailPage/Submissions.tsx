import React, {memo, useState} from "react";
import {DropZone, LoadingOverlay, PrimaryButton} from "components";
import dayjs from "dayjs";
import {List, Typography} from "@material-ui/core";
import update from "immutability-helper";
import {useTranslation} from "react-i18next";
import {useMutation} from "react-query";
import {useQueryOptions, useSendSubmissionAPI, useSnackbar} from "hooks";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {AxiosError} from "axios";
import {ISendSubmissionData, ISendSubmissionResponse, SingleData} from "hooks/apis/send/useSendSubmissionAPI";
import {getISODatetime} from "utils";

import SubmissionElement, {SubmissionFile} from "./SubmissionElement";

export interface ISubmissions {
    lessonId: string;
}

const Submissions = ({lessonId}: ISubmissions) => {
    const {t} = useTranslation();
    const sendFiles = useSendSubmissionAPI();
    const queryOptions = useQueryOptions();
    const {addError} = useSnackbar();

    const [files, setFiles] = useState<SubmissionFile[]>([]);
    const {
        mutateAsync,
        isLoading,
    } = useMutation<ISendSubmissionResponse, AxiosError, ISendSubmissionData>(
        sendFiles,
        {
            ...queryOptions,
            onError: error => {
                // eslint-disable-next-line no-console
                console.log(error.response);
                addError(error, undefined, PredefinedMessageType.ErrorMutating);
            },
            onSuccess: () => setFiles([]),
        },
    );

    const uploadFiles = () => {
        mutateAsync(
            files.map((file): SingleData => ({
                file: file.nativeFile,
                lessonId,
                uploadAt: getISODatetime(file.uploadDate),
            })),
        );
    };

    return (
        <LoadingOverlay isLoading={isLoading}>
            <DropZone<SubmissionFile>
                value={files}
                renderList={(files) =>
                    <>
                        <List dense>
                            {files.map((file, index) =>
                                <SubmissionElement
                                    key={`${file.nativeFile.name}_${file.nativeFile.size}_${file.nativeFile.type}_${file.uploadDate.toISOString()}`}
                                    file={file}
                                    onChange={newFile => setFiles(prevState => update(prevState, {
                                        [index]: {
                                            $set: newFile,
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
                            nativeFile: file,
                            uploadDate: dayjs(),
                        })),
                    ]);
                }}
            />
        </LoadingOverlay>
    );
};


export default memo(Submissions);
