import {StudentSubmissionDetail} from "types";
import {convertToDate} from "api";
import dayjs from "dayjs";

import {parseStudentLessonDateMixin} from "../../timetable";


const parseStudentSubmissionDetail = async (submission: StudentSubmissionDetail) => {
    await parseStudentLessonDateMixin(submission);
    convertToDate(submission, ["publishDatetime", "createdAt"]);

    submission.isUploaded = function() {
        return Boolean(this.publishDatetime?.isBefore?.(dayjs()));
    };

};

export default parseStudentSubmissionDetail;
