import React, {useContext, useState} from "react";
import {StudentSubmissionDetail} from "types";
import {
    CircularProgress,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from "@material-ui/core";
import {MdDeleteForever, MdFileDownload, MdSettings} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {BottomSheetAction, DueDateChanger, ExtensionAvatar, ICON_SIZE} from "components";

import FileInformation from "../../../../../../components/FileInformation";
import SubmissionContext from "../SubmissionContext";

import useUpdate from "./useUpdate";


export interface ISubmission {
    submission: StudentSubmissionDetail;
}

const Submission = ({
    submission,
}: ISubmission) => {
    const {
        lesson,
    } = useContext(SubmissionContext);
    const {
        delete: deleteSubmission,
        update,
        isDeleting,
        isUpdating,
    } = useUpdate(submission);
    const {t} = useTranslation();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <ExtensionAvatar name={submission.name} />
                </ListItemAvatar>
                <FileInformation
                    filename={submission.name}
                    course={lesson.course}
                    uploadDate={submission.publishDatetime}
                    size={submission.size}
                    creationDate={submission.createdAt}
                />
                <ListItemSecondaryAction>
                    <IconButton>
                        <MdSettings onClick={() => setIsOpen(true)} />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <BottomSheetAction
                title={submission.name}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <ListItem
                    button
                    download
                    disabled={isDeleting}
                    component="a"
                    href={submission.file}
                    target="_blank"
                >
                    <ListItemIcon>
                        <MdFileDownload size={ICON_SIZE} />
                    </ListItemIcon>
                    <ListItemText primary={t("Download")} />
                </ListItem>

                <DueDateChanger
                    pickerType="datetime"
                    disabled={submission.isUploaded || isDeleting}
                    weekdays={lesson.course.weekdays}
                    color={lesson.course.subject.userRelation.color}
                    title={t("Hochladedatum ändern")}
                    isLoading={isUpdating}
                    date={submission.publishDatetime}
                    onChange={newDate =>
                        update({
                            publishDatetime: newDate,
                        })
                            .then(() => setIsOpen(false))
                    }
                />

                <ListItem
                    button
                    disabled={isDeleting}
                    onClick={() =>
                        deleteSubmission()
                            .then(() => setIsOpen(false))
                    }
                >
                    <ListItemIcon>
                        <MdDeleteForever size={ICON_SIZE} />
                    </ListItemIcon>
                    <ListItemText primary={t("Löschen")} />
                    {isDeleting && <CircularProgress size="1rem" color="inherit" />}
                </ListItem>
            </BottomSheetAction>
        </>
    );
};

export default Submission;
