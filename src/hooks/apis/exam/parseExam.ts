import {convertToDate} from "api";
import {ExamDetail} from "types";

import {parseCourse} from "../course";

const parseExam = async (exam: ExamDetail): Promise<void> => {
    convertToDate(exam, [
        "targetedDate",
        "createdAt",
    ]);
    await parseCourse(exam.course);
};

export default parseExam;
