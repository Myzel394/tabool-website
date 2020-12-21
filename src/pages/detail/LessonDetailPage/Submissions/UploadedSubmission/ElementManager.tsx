import React, {memo, useContext, useState} from "react";
import {SubmissionDetail} from "types";
import {useMutation, useQuery} from "react-query";
import {AxiosError} from "axios";
import {
    IGetUploadStatusSubmissionResponse,
    IUpdateSubmissionData,
    IUpdateSubmissionResponse,
    IUploadFileOnScoosoSubmissionResponse,
    useGetUploadStatusSubmissionAPI,
    useUpdateSubmissionAPI,
    useUploadFileOnScoosoSubmissionAPI,
} from "hooks/apis";
import {useSnackbar} from "hooks";
import {PredefinedMessageType} from "hooks/useSnackbar";
import update from "immutability-helper";
import {getISODatetime} from "utils";
import {useInterval} from "@shopify/react-hooks";
import {UploadStatus} from "api";
import {useTranslation} from "react-i18next";

import LessonContext from "../../LessonContext";

import Element from "./Element";

export interface IElement {
    submission: SubmissionDetail;
    iconElement: JSX.Element;
    onDelete: () => any;
}

const ElementManager = ({submission, iconElement, onDelete}: IElement) => {
    const {t} = useTranslation();
    const {onChange, lesson} = useContext(LessonContext);
    const updateSubmission = useUpdateSubmissionAPI();
    const getSubmissionStatus = useGetUploadStatusSubmissionAPI();
    const uploadSubmissionToScooso = useUploadFileOnScoosoSubmissionAPI();
    const {addError} = useSnackbar();

    const [status, setStatus] = useState<UploadStatus>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Get status
    const {
        refetch: refetchSubmissionStatus,
        isLoading: isFileUploading,
    } = useQuery<IGetUploadStatusSubmissionResponse, AxiosError>(
        [`get_submission_status_${submission.id}`, submission.id],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        context => {
            const [, id] = Array.from(context.queryKey);
            if (typeof id === "string") {
                return getSubmissionStatus(id);
            }
        },
        {
            onSuccess: data => setStatus(data.uploadStatus),
        },
    );
    // Upload file to scooso
    const {
        mutate: uploadFileMutate,
        isLoading: isFileUploadingOnScooso,
    } = useMutation<IUploadFileOnScoosoSubmissionResponse, AxiosError, string>(
        uploadSubmissionToScooso,
        {
            onMutate: () => {
                setErrorMessage(null);
            },
            onError: error => {
                if (error.response?.status === 502) {
                    setErrorMessage(t("Scooso hat die Datei abgelehnt. (Vielleicht ungültige Datei oder Upload-Limit erreicht?)"));
                } else {
                    setErrorMessage(error.message);
                }
            },
            onSuccess: data => setStatus(data.uploadStatus),
        },
    );
    // Update settings
    const {
        mutate: updateSubmissionMutation,
        isLoading: isUpdatingSubmission,
    } = useMutation<IUpdateSubmissionResponse, AxiosError, IUpdateSubmissionData>(
        updateSubmission,
        {
            onSuccess: newSubmission => {
                const index = lesson.submissions.findIndex(element => element.id === submission.id);

                onChange(update(lesson.submissions, {
                    [index]: {
                        $set: newSubmission,
                    },
                }));
            },
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );

    useInterval(() => {
        if (status === UploadStatus.Pending) {
            refetchSubmissionStatus();
        }
    }, 3000);

    return (
        <Element
            isFileUploaded={status === UploadStatus.Uploaded}
            isLoading={isUpdatingSubmission}
            isFileUploading={isFileUploading || status === UploadStatus.Pending || isFileUploadingOnScooso}
            submission={submission}
            iconElement={iconElement}
            errorMessage={errorMessage}
            onSettingsChange={newSettings => updateSubmissionMutation({
                id: submission.id,
                uploadDate: newSettings.uploadDate ? getISODatetime(newSettings.uploadDate) : null,
            })}
            onDelete={onDelete}
            onUploadToScooso={() => uploadFileMutate(submission.id)}
        />
    );
};

export default memo(ElementManager);
