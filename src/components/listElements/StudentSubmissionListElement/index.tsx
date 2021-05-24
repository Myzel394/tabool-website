import React, {useState} from "react";
import {StudentSubmissionDetail} from "types";
import {DialogContentText} from "@material-ui/core";
import {useTranslation} from "react-i18next";

import FileInformation from "../../FileInformation";
import ListItemOptions from "../../ListItemOptions";

import useUpdate, {UseUpdateData} from "./useUpdate";

export interface StudentSubmissionListElementProps {
    submission: StudentSubmissionDetail;

    onUpdate?: UseUpdateData["onUpdate"];
    onDelete?: UseUpdateData["onDelete"];
}

const StudentSubmissionListElement = ({
    submission,
    onUpdate,
    onDelete,
}: StudentSubmissionListElementProps) => {
    const {t} = useTranslation();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        isDeleting,
        isUpdating,
        update: updateSubmission,
        delete: deleteSubmission,
    } = useUpdate({
        id: submission.id,
        onUpdate,
        onDelete,
    });

    return (
        <ListItemOptions
            allowDatetimeNull
            lessonColor={submission.lesson.course.subject.userRelation.color}
            lessonWeekdays={submission.lesson.course.weekdays}
            title={submission.name}
            isOpen={isOpen}
            date={submission.publishDatetime}
            pickerType="datetime"
            isDeleting={isDeleting}
            isUpdating={isUpdating}
            downloadLink={submission.file}
            deleteConfirmChildren={
                <DialogContentText>
                    {t("Möchtest du wirklich diese Einsendung löschen?")}
                </DialogContentText>
            }
            onClose={() => setIsOpen(false)}
            onDateChange={newDate =>
                updateSubmission({
                    publishDatetime: newDate,
                })
                    .then(() => setIsOpen(false))
            }
            onDelete={() =>
                deleteSubmission()
                    .then(() => setIsOpen(false))
            }
        >
            <FileInformation
                filename={submission.name}
                course={submission.lesson.course}
                uploadDate={submission.publishDatetime}
                size={submission.size}
                creationDate={submission.createdAt}
            />
        </ListItemOptions>
    );
};

export default StudentSubmissionListElement;
