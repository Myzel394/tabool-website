import {TeacherExamApprox} from "types";
import {convertToDate} from "api";

import {parseTeacherCourseDetail} from "../../course";

const parseTeacherExamApprox = async (exam: TeacherExamApprox) => {
    await parseTeacherCourseDetail(exam.course);

    convertToDate(exam, ["date"]);
};

export default parseTeacherExamApprox;
