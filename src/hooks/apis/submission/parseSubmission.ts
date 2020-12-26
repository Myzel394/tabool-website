import {convertToDate} from "api";
import {SubmissionDetail} from "types";

const parseSubmission = async (submission: SubmissionDetail): Promise<void> => {
    convertToDate(submission, [
        "uploadDate", "createdAt",
    ]);
    if (submission.lesson) {
        const lesson = await import("../lesson");
        await lesson.parseLesson(submission.lesson);
    }
};

export default parseSubmission;
