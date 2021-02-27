import {StudentSubmissionDetail} from "types";
import {convertToDate} from "api";
import dayjs from "dayjs";

import {parseStudentLessonDateMixin} from "../../timetable";


const parseStudentSubmissionDetail = async (submission: StudentSubmissionDetail) => {
    convertToDate(submission, ["publishDatetime", "createdAt"]);
    submission.isUploaded = Boolean(submission.publishDatetime && submission.publishDatetime.isBefore(dayjs()));

    await parseStudentLessonDateMixin(submission);
};

export default parseStudentSubmissionDetail;
