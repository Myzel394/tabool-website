import React, {memo, useContext, useState} from "react";
import {IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import {MdFileDownload, MdSettings} from "react-icons/all";
import {SubmissionDetail} from "types";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {IUpdateSubmissionData, IUpdateSubmissionResponse, useUpdateSubmissionAPI} from "hooks/apis";
import {useSnackbar} from "hooks";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {LoadingOverlay} from "components";
import update from "immutability-helper";
import {getISODatetime} from "utils";

import LessonContext from "../../LessonContext";
import SettingsModal from "../SettingsModal";
import FileInformation from "../FileInformation";

export interface IElement {
    submission: SubmissionDetail;
    iconElement: JSX.Element;
}

const Element = ({submission, iconElement}: IElement) => {
    const {onChange, lesson} = useContext(LessonContext);
    const updateSubmission = useUpdateSubmissionAPI();
    const {addError} = useSnackbar();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        mutate,
        isLoading,
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

    return (
        <>
            <LoadingOverlay isLoading={isLoading}>
                <ListItem>
                    {iconElement}
                    <FileInformation
                        filename={submission.filename}
                        creationDate={submission.createdAt}
                        uploadDate={submission.uploadDate}
                        size={submission.size}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => setIsOpen(true)}>
                            <MdSettings />
                        </IconButton>
                        <a href={submission.file}>
                            <IconButton edge="end">
                                <MdFileDownload />
                            </IconButton>
                        </a>
                    </ListItemSecondaryAction>
                </ListItem>
            </LoadingOverlay>
            <SettingsModal
                value={{
                    uploadDate: submission.uploadDate,
                }}
                isOpen={isOpen}
                onChange={newSettings => mutate({
                    id: submission.id,
                    uploadDate: newSettings.uploadDate ? getISODatetime(newSettings.uploadDate) : null,
                })}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
};

export default memo(Element);
