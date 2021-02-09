import {StudentExamDetail} from "types";
import {convertToDate} from "api";

import {parseStudentCourseDetail} from "../../course";

const parseStudentExamDetail = async (exam: StudentExamDetail) => {
    await parseStudentCourseDetail(exam.course);

    convertToDate(exam, ["date"]);
};

export default parseStudentExamDetail;
