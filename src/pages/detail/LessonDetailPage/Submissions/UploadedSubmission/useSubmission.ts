/* eslint-disable no-return-await */
import {UseMutateAsyncFunction, useMutation, useQuery} from "react-query";
import {AxiosError} from "axios";
import {
    IGetUploadStatusSubmissionResponse,
    IUpdateSubmissionData,
    IUpdateSubmissionResponse,
    IUploadFileOnScoosoSubmissionResponse,
    useDeleteSubmissionAPI,
    useGetUploadStatusSubmissionAPI,
    useUpdateSubmissionAPI,
    useUploadFileOnScoosoSubmissionAPI,
} from "hooks/apis";
import useSnackbar, {PredefinedMessageType} from "hooks/useSnackbar";
import {UploadStatus} from "api";
import {SubmissionDetail} from "types";
import {useInterval} from "@shopify/react-hooks";
import {useTranslation} from "react-i18next";

export interface IUseSubmissionResult {
    status: UploadStatus;

    isUpdatingSettings: boolean;

    update: UseMutateAsyncFunction<IUpdateSubmissionResponse | void, AxiosError, IUpdateSubmissionData>;
    upload: UseMutateAsyncFunction<IUploadFileOnScoosoSubmissionResponse | void, AxiosError, void>;
    delete: UseMutateAsyncFunction<void, AxiosError, void>;
}

const useSubmission = (submission: SubmissionDetail): IUseSubmissionResult => {
    const {t} = useTranslation();
    const {addError} = useSnackbar();
    const getSubmissionStatus = useGetUploadStatusSubmissionAPI();
    const updateSubmission = useUpdateSubmissionAPI();
    const uploadSubmissionToScooso = useUploadFileOnScoosoSubmissionAPI();
    const deleteSubmission = useDeleteSubmissionAPI();

    // Get status
    const {
        data: statusData,
        refetch: refetchSubmissionStatus,
    } = useQuery<IGetUploadStatusSubmissionResponse, AxiosError>(
        `get_submission_status_${submission.id}`,
        () => getSubmissionStatus(submission.id),
    );
    useInterval(() => {
        if (statusData?.uploadStatus === UploadStatus.Pending) {
            refetchSubmissionStatus();
        }
    }, 3000);


    // Update settings
    const {
        mutateAsync: update,
        isLoading: isUpdatingSettings,
    } = useMutation<IUpdateSubmissionResponse | void, AxiosError, IUpdateSubmissionData>(
        async values => {
            if (
                (submission.uploadDate === null && values.uploadDate === null) ||
                (values.uploadDate && submission.uploadDate?.isSame?.(values.uploadDate))
            ) {
                return;
            }

            return await updateSubmission(submission.id, values);
        },
        {
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );


    // Upload file to Scooso
    const {
        mutateAsync: upload,
        isLoading: isUploading,
        isSuccess: isUploaded,
    } = useMutation<IUploadFileOnScoosoSubmissionResponse | void, AxiosError, void>(
        async () => {
            if (submission.isUploaded) {
                return;
            }
            return await uploadSubmissionToScooso(submission.id);
        },
        {
            onError: (error) => {
                if (error.response?.status === 502) {
                    addError(t("Scooso hat die Datei abgelehnt. (Vielleicht ungültige Datei oder Upload-Limit erreicht?)"));
                } else {
                    addError(error, undefined, PredefinedMessageType.ErrorUploading);
                }
            },
        },
    );


    // Delete submission
    const {
        mutateAsync: del,
    } = useMutation<void, AxiosError, void>(
        () => deleteSubmission(submission.id),
        {
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );

    return {
        update,
        upload,
        isUpdatingSettings,
        delete: del,
        status: (() => {
            if (isUploaded) {
                return UploadStatus.Uploaded;
            } else if (isUploading) {
                return UploadStatus.Pending;
            } else if (statusData?.uploadStatus) {
                return statusData.uploadStatus;
            } else {
                return UploadStatus.Resting;
            }
        })(),
    };
};

export default useSubmission;
