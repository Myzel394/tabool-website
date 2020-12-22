import React, {memo} from "react";
import {LessonDetail, SubmissionDetail} from "types";
import {useInheritedState} from "hooks";

import SubmitFiles from "./SubmitFiles";
import UploadedSubmissions from "./UploadedSubmission";
import SubmissionsContext from "./SubmissionsContext";

export interface ISubmissions {
    lesson: LessonDetail;
}

const Submissions = ({lesson}: ISubmissions) => {
    const [submissions, setSubmissions] = useInheritedState<SubmissionDetail[]>(lesson.submissions);

    return (
        <SubmissionsContext.Provider
            value={{
                lesson,
                submissions,
                onSubmissionsChange: setSubmissions,
            }}
        >
            {submissions.length > 0 &&
                <UploadedSubmissions />
            }
            <SubmitFiles />
        </SubmissionsContext.Provider>
    );
};

export default memo(Submissions);
