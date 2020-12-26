import {convertToDate} from "api";
import {ExamApprox} from "types";

const parseExamApprox = (exam: ExamApprox): void => {
    convertToDate(exam, ["targetedDate"]);
};

export default parseExamApprox;
