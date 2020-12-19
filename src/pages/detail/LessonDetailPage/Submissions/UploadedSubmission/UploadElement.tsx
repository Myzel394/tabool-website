import React, {memo, useContext, useState} from "react";
import {SubmissionDetail} from "types";
import {Dayjs} from "dayjs";

import LessonContext from "../../LessonContext";
import SubmissionElement, {ISubmissionElement} from "../SubmissionElement";

import DeleteConfirmDialog from "./DeleteConfirmDialog";

export interface IUploadElement {
    submission: SubmissionDetail;
    onSettingsChange: ISubmissionElement["onSettingsChange"];
    onDelete: ISubmissionElement["onDelete"];
    creationDate: Dayjs;
}

const UploadElement = ({submission, onSettingsChange, onDelete, creationDate}: IUploadElement) => {
    const {lesson} = useContext(LessonContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const lessonDateWeeks = lesson.lessonData.weekdays;
    const lessonColor = lesson.lessonData.course.subject.userRelation.color;

    return (
        <>
            <SubmissionElement
                key={`uploaded_submission_${submission.id}`}
                filename={submission.filename}
                fileSize={submission.size}
                fileSettings={{
                    uploadDate: submission.uploadDate,
                }}
                fileCreationDate={creationDate}
                lessonColor={lessonColor}
                lessonDateWeeks={lessonDateWeeks}
                onSettingsChange={onSettingsChange}
                onDelete={() => setIsOpen(true)}
            />
            <DeleteConfirmDialog
                filename={submission.filename}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onContinue={onDelete}
            />
        </>
    );
};

export default memo(UploadElement);
