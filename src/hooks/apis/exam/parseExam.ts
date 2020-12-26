import {convertToDate} from "api";
import {ExamDetail} from "types";

const parseExam = (exam: ExamDetail): void => {
    convertToDate(exam, [
        "targetedDate",
        "createdAt",
    ]);
};

export default parseExam;
