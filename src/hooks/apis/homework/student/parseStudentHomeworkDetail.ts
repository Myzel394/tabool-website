import {StudentHomeworkDetail} from "types";
import {convertToDate} from "api";

import {parseStudentLessonDateMixin} from "../../timetable";

const parseStudentHomeworkDetail = async (homework: StudentHomeworkDetail) => {
    await parseStudentLessonDateMixin(homework);
    convertToDate(homework, ["dueDate", "createdAt"]);
};

export default parseStudentHomeworkDetail;
