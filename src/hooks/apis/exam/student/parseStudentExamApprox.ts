import {StudentExamApprox} from "types";
import {convertToDate} from "api";

import {parseStudentCourseDetail} from "../../course";

const parseStudentExamApprox = async (exam: StudentExamApprox) => {
    await parseStudentCourseDetail(exam.course);

    convertToDate(exam, ["date"]);
};

export default parseStudentExamApprox;
