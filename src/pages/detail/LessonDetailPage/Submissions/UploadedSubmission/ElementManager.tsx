import React, {memo, useContext} from "react";
import {SubmissionDetail} from "types";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {IUpdateSubmissionData, IUpdateSubmissionResponse, useUpdateSubmissionAPI} from "hooks/apis";
import {useSnackbar} from "hooks";
import {PredefinedMessageType} from "hooks/useSnackbar";
import update from "immutability-helper";

import LessonContext from "../../LessonContext";
import {getISODatetime} from "../../../../../utils";

import Element from "./Element";

export interface IElement {
    submission: SubmissionDetail;
    iconElement: JSX.Element;
    onDelete: () => any;
}

const ElementManager = ({submission, iconElement, onDelete}: IElement) => {
    const {onChange, lesson} = useContext(LessonContext);
    const updateSubmission = useUpdateSubmissionAPI();
    const {addError} = useSnackbar();

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

    return <Element
        isLoading={isUpdatingSubmission}
        submission={submission}
        iconElement={iconElement}
        onSettingsChange={newSettings => updateSubmissionMutation({
            id: submission.id,
            uploadDate: newSettings.uploadDate ? getISODatetime(newSettings.uploadDate) : null,
        })}
        onDelete={onDelete}
        onUploadToScooso={() => null}
    />;
};

export default memo(ElementManager);
