import React, {memo, useContext} from "react";
import {List} from "@material-ui/core";
import {
    IUpdateSubmissionData,
    IUpdateSubmissionResponse,
    useDeleteSubmissionAPI,
    useUpdateSubmissionAPI,
} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import update from "immutability-helper";
import {useSnackbar} from "hooks";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {getISODatetime} from "utils";
import {LoadingOverlay} from "components";

import LessonContext from "../../LessonContext";

import UploadElement from "./UploadElement";

const UploadedSubmissions = () => {
    const {lesson, onChange} = useContext(LessonContext);
    const updateSubmission = useUpdateSubmissionAPI();
    const deleteSubmission = useDeleteSubmissionAPI();
    const {addError} = useSnackbar();
    const {submissions} = lesson;

    const {
        mutate,
        isLoading,
    } = useMutation<IUpdateSubmissionResponse, AxiosError, IUpdateSubmissionData>(
        updateSubmission,
        {
            onSuccess: newSubmission => {
                const index = submissions.findIndex(submission => submission.id === newSubmission.id);

                onChange(update(submissions, {
                    [index]: {
                        $set: newSubmission,
                    },
                }));
            },
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );

    return (
        <LoadingOverlay isLoading={isLoading}>
            <List>
                {submissions.map(submission =>
                    <UploadElement
                        key={`uploaded_submission_${submission.id}`}
                        submission={submission}
                        creationDate={submission.createdAt}
                        onSettingsChange={newSettings => {
                            mutate({
                                id: submission.id,
                                uploadDate: newSettings.uploadDate ? getISODatetime(newSettings.uploadDate) : null,
                            });
                        }}
                        onDelete={() => null}
                    />)}
            </List>
        </LoadingOverlay>
    );
};

export default memo(UploadedSubmissions);
