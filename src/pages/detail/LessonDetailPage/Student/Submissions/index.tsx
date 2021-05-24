import React from "react";
import {StudentLessonDetail, StudentSubmissionDetail} from "types";
import {Dayjs} from "dayjs";
import {useInheritedState} from "hooks";

import SubmissionContext from "./SubmissionContext";
import UploadForm from "./UploadForm";
import SubmissionsList from "./SubmissionsList";


export interface SubmissionsProps {
    submissions: StudentSubmissionDetail[];
    lesson: StudentLessonDetail;
    lessonDate: Dayjs;
}

const Submissions = ({
    submissions: parentSubmissions,
    lesson,
    lessonDate,
}: SubmissionsProps) => {
    const [submissions, setSubmissions] = useInheritedState<StudentSubmissionDetail[]>(parentSubmissions);

    return (
        <SubmissionContext.Provider
            value={{
                submissions,
                lesson,
                lessonDate,
                onSubmissionsChange: setSubmissions,
            }}
        >
            <SubmissionsList />
            <UploadForm />
        </SubmissionContext.Provider>
    );
};
export default Submissions;

