import {StudentSubmissionDetail} from "types";
import {convertToDate} from "api";

import {parseStudentLessonDateMixin} from "../../timetable";

const parseStudentSubmissionDetail = async (submission: StudentSubmissionDetail) => {
    await parseStudentLessonDateMixin(submission);
    convertToDate(submission, ["publishDatetime", "createdAt"]);
};

export default parseStudentSubmissionDetail;
