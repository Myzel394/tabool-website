import {convertToDate} from "api";
import {ExamDetail} from "types";

import {parseCourse} from "../course";

const parseExam = (exam: ExamDetail): void => {
    convertToDate(exam, [
        "targetedDate",
        "createdAt",
    ]);
    parseCourse(exam.course);
};

export default parseExam;
