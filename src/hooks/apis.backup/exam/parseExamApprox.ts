import {convertToDate} from "api";
import {ExamApprox} from "types";

const parseExamApprox = async (exam: ExamApprox): Promise<void> => {
    convertToDate(exam, ["targetedDate"]);
};

export default parseExamApprox;
