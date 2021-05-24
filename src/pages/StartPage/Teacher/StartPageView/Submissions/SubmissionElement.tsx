import React from "react";
import {IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {MdFileDownload} from "react-icons/all";
import {TeacherSubmissionDetail} from "types";
import {useTranslation} from "react-i18next";

import SecondaryInformation from "../SecondaryInformation";
import {usePrettyBytes} from "../../../../../hooks";


export interface SubmissionElementProps {
    submission: TeacherSubmissionDetail;
    innerRef: any;
}

const SubmissionElement = ({
    submission,
    innerRef,
}: SubmissionElementProps) => {
    const {t} = useTranslation();
    const prettyBytes = usePrettyBytes();

    return (
        <ListItem>
            <div ref={innerRef} style={{width: "100%"}}>
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
            </div>
            <ListItemSecondaryAction>
                <IconButton href={submission.file}>
                    <MdFileDownload />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default SubmissionElement;
