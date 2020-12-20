import React, {memo, useContext, useState} from "react";
import {Box, IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import prettyBytes from "pretty-bytes";
import {MdAdd, MdFileDownload, MdFileUpload, MdSettings} from "react-icons/all";
import {SubmissionDetail} from "types";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {IUpdateSubmissionData, IUpdateSubmissionResponse, useUpdateSubmissionAPI} from "hooks/apis";
import {useSnackbar} from "hooks";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {LoadingOverlay} from "components";
import update from "immutability-helper";

import SettingsModal from "../SettingsModal";
import {getISODatetime} from "../../../../../utils";
import LessonContext from "../../LessonContext";

export interface IElement {
    submission: SubmissionDetail;
    iconElement: JSX.Element;
}

const wrapOverflowStyle = {
    overflowWrap: "anywhere" as "anywhere",
};
const informationProps = {
    display: "flex",
    alignItems: "center",
};

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
                <ListItem button>
                    {iconElement}
                    <ListItemText
                        style={wrapOverflowStyle}
                        primary={submission.filename}
                        secondary={
                            <>
                                <Box {...informationProps}>
                                    {prettyBytes(submission.size, {
                                        locale: "de",
                                    })}
                                </Box>
                                {submission.createdAt && (
                                    <Box {...informationProps}>
                                        <MdAdd />
                                        {submission.createdAt.format("lll")}
                                    </Box>
                                )}
                                {submission.uploadDate && (
                                    <Box {...informationProps}>
                                        <MdFileUpload />
                                        {submission.uploadDate.format("lll")}
                                    </Box>
                                )}
                            </>
                        }
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
