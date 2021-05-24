import {StudentSubmissionDetail} from "types";
import {IUpdateStudentSubmissionData, useDeleteStudentSubmissionAPI, useUpdateStudentSubmissionAPI} from "hooks/apis";
import {UseMutateAsyncFunction, useMutation} from "react-query";
import {AxiosError} from "axios";
import {useSnackbar} from "hooks";
import {PredefinedMessageType} from "hooks/useSnackbar";


export interface UseUpdateData {
    id: string;
    onUpdate?: (newMaterial: StudentSubmissionDetail) => any;
    onDelete?: () => any;
}

export interface UseUpdateResponse {
    update: UseMutateAsyncFunction<StudentSubmissionDetail, AxiosError, IUpdateStudentSubmissionData>;
    isUpdating: boolean;

    delete: UseMutateAsyncFunction<void, AxiosError, void>;
    isDeleting: boolean;
}

const useUpdate = ({
    id: submissionId,
    onDelete,
    onUpdate,
}: UseUpdateData): UseUpdateResponse => {
    const {addError} = useSnackbar();
    const updateSubmission = useUpdateStudentSubmissionAPI();
    const deleteSubmission = useDeleteStudentSubmissionAPI();

    const {
        mutateAsync: updateFunction,
        isLoading: isUpdating,
    } = useMutation<StudentSubmissionDetail, AxiosError, IUpdateStudentSubmissionData>(
        values => updateSubmission(submissionId, values),
        {
            onSuccess: onUpdate,
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );
    const {
        mutateAsync: deleteFunction,
        isLoading: isDeleting,
    } = useMutation<void, AxiosError, void>(
        () => deleteSubmission(submissionId),
        {
            onSuccess: onDelete,
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );

    return {
        delete: deleteFunction,
        update: updateFunction,
        isUpdating,
        isDeleting,
    };
};

export default useUpdate;
