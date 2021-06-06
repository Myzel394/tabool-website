import React from "react";
import {TeacherSubmissionDetail} from "types";
import {useTranslation} from "react-i18next";
import {IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {MdFileDownload} from "react-icons/all";
import {usePrettyBytes} from "hooks";
import {ExtensionAvatar} from "components";

import SecondaryInformation from "./SecondaryInformation";


export interface TeacherSubmissionListElementProps {
    submission: TeacherSubmissionDetail;
}

const TeacherSubmissionListElement = ({
    submission,
}: TeacherSubmissionListElementProps) => {
    const {t} = useTranslation();
    const prettyBytes = usePrettyBytes();

    return (
        <ListItem>
            <ListItemAvatar>
                <ExtensionAvatar name={submission.name} />
            </ListItemAvatar>
            <ListItemText
                primary={`${submission.student.firstName} ${submission.student.lastName}`}
                secondary={
                    <SecondaryInformation
                        information={[
                            [t("Größe"), prettyBytes(submission.size)],
                            [t("Datei"), submission.name],
                        ]}
                    />
                }
            />
            <ListItemSecondaryAction>
                <IconButton download href={submission.file}>
                    <MdFileDownload />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default TeacherSubmissionListElement;
