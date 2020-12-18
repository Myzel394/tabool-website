import React from "react";
import {SubmissionDetail} from "types";

import UploadedSubmissions from "./UploadedSubmissions";
import SubmitFiles from "./SubmitFiles";

export interface ISubmissions {
    lessonId: string;
    submissions: SubmissionDetail[];
}

const Submissions = ({lessonId, submissions}: ISubmissions) => {
    return (
        <>
            {submissions.length > 0 &&
                <UploadedSubmissions submissions={submissions} />
            }
            <SubmitFiles lessonId={lessonId} />
        </>
    );
};


export default Submissions;
