import React from "react";
import {StudentLessonDetail, StudentSubmissionDetail} from "types";
import {useInheritedState} from "hooks";
import {Dayjs} from "dayjs";

import SubmitFiles from "./SubmitFiles";
import UploadedSubmissions from "./UploadedSubmission";

export interface ISubmissions {
    submissions: StudentSubmissionDetail[];
    lesson: StudentLessonDetail;
    lessonDate: Dayjs;
}

const Submissions = ({submissions: parentSubmissions, lesson, lessonDate}: ISubmissions) => {
    const [submissions, setSubmissions] = useInheritedState<StudentSubmissionDetail[]>(parentSubmissions);

    return (
        <>
            {submissions.length > 0 &&
            <UploadedSubmissions lesson={lesson} submissions={submissions} onChange={setSubmissions} />}
            <SubmitFiles
                lesson={lesson}
                submissions={submissions}
                lessonDate={lessonDate}
                onSubmissionsChange={setSubmissions}
            />
        </>
    );
};

export default Submissions;
