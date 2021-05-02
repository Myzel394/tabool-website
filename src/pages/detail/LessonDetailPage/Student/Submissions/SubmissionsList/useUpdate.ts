import {StudentSubmissionDetail} from "types";
import {IUpdateStudentSubmissionData, useDeleteStudentSubmissionAPI, useUpdateStudentSubmissionAPI} from "hooks/apis";
import {UseMutateAsyncFunction, useMutation} from "react-query";
import {useContext} from "react";
import {AxiosError} from "axios";
import {useSnackbar} from "hooks";
import {PredefinedMessageType} from "hooks/useSnackbar";
import update from "immutability-helper";

import SubmissionContext from "../SubmissionContext";

export interface IUseUpdateResult {
    update: UseMutateAsyncFunction<StudentSubmissionDetail, AxiosError, IUpdateStudentSubmissionData>;
    delete: UseMutateAsyncFunction<void, AxiosError, void>;
    isUpdating: boolean;
    isDeleting: boolean;
}

const useUpdate = (submission: StudentSubmissionDetail): IUseUpdateResult => {
    const {
        submissions,
        onSubmissionsChange,
    } = useContext(SubmissionContext);
    const {addError} = useSnackbar();
    const updateSubmission = useUpdateStudentSubmissionAPI();
    const deleteSubmission = useDeleteStudentSubmissionAPI();

    const {
        mutateAsync: updateFunction,
        isLoading: isUpdating,
    } = useMutation<StudentSubmissionDetail, AxiosError, IUpdateStudentSubmissionData>(
        values => updateSubmission(submission.id, values),
        {
            onSuccess: newSubmission =>
                onSubmissionsChange(prevState => {
                    const index = submissions.findIndex(givenSubmission => submission.id === givenSubmission.id);

                    return update(prevState, {
                        [index]: {
                            $set: newSubmission,
                        },
                    });
                }),
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );
    const {
        mutateAsync: deleteFunction,
        isLoading: isDeleting,
    } = useMutation<void, AxiosError, void>(
        () => deleteSubmission(submission.id),
        {
            onSuccess: () =>
                onSubmissionsChange(prevState => {
                    const index = submissions.findIndex(givenSubmission => submission.id === givenSubmission.id);

                    return update(prevState, {
                        $splice: [
                            [index, 1],
                        ],
                    });
                }),
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
