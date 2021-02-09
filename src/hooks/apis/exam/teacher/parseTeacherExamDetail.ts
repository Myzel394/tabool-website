import {TeacherExamDetail} from "types";
import {convertToDate} from "api";

import {parseTeacherCourseDetail} from "../../course";

const parseTeacherExamDetail = async (exam: TeacherExamDetail) => {
    await parseTeacherCourseDetail(exam.course);

    convertToDate(exam, ["date", "createdAt"]);
};

export default parseTeacherExamDetail;
