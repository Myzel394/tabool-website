import {convertToDate} from "api";
import {SubmissionDetail} from "types";

import {parseLesson} from "../lesson";

const parseSubmission = (submission: SubmissionDetail): void => {
    convertToDate(submission, [
        "uploadAt",
    ]);
    if (submission.lesson) {
        parseLesson(submission.lesson);
    }
};

export default parseSubmission;
