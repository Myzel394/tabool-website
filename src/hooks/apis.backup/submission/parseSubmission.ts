import {convertToDate} from "api";
import {SubmissionDetail} from "types";

const parseSubmission = async (submission: SubmissionDetail): Promise<void> => {
    convertToDate(submission, [
        "uploadDate", "createdAt",
    ]);
    const lesson = await import("../lesson");
    await lesson.parseLessonRelatedDetail(submission.lesson);
};

export default parseSubmission;
