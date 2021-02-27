import {UseMutateAsyncFunction, useMutation} from "react-query";
import {AxiosError} from "axios";
import {
    IUpdateStudentSubmissionData,
    useDeleteStudentSubmissionAPI,
    useUpdateStudentSubmissionAPI,
    useUploadStudentSubmissionAPI,
} from "hooks/apis";
import useSnackbar, {PredefinedMessageType} from "hooks/useSnackbar";
import {StudentSubmissionDetail} from "types";

export interface IUseSubmissionResult {
    isUpdating: boolean;
    isUploading: boolean;

    update: UseMutateAsyncFunction<StudentSubmissionDetail | void, AxiosError, IUpdateStudentSubmissionData>;
    upload: UseMutateAsyncFunction<StudentSubmissionDetail, AxiosError, void>;
    delete: UseMutateAsyncFunction<void, AxiosError, void>;
}

const useSubmission = (submission: StudentSubmissionDetail): IUseSubmissionResult => {
    const {addError} = useSnackbar();
    const updateSubmission = useUpdateStudentSubmissionAPI();
    const deleteSubmission = useDeleteStudentSubmissionAPI();
    const uploadSubmission = useUploadStudentSubmissionAPI();

    // Update settings
    const {
        mutateAsync: update,
        isLoading: isUpdatingSettings,
    } = useMutation<StudentSubmissionDetail, AxiosError, IUpdateStudentSubmissionData>(
        async values => updateSubmission(submission.id, values),
        {
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );

    // Delete submission
    const {
        mutateAsync: del,
        isLoading: isUpdating,
    } = useMutation<void, AxiosError, void>(
        () => deleteSubmission(submission.id),
        {
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );

    // Upload
    const {
        mutateAsync: upload,
        isLoading: isUploading,
    } = useMutation<StudentSubmissionDetail, AxiosError, void>(
        () => uploadSubmission(submission.id),
        {
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );


    return {
        update,
        upload,
        isUploading,
        delete: del,
        isUpdating: isUpdating || isUpdatingSettings,
    };
};

export default useSubmission;
