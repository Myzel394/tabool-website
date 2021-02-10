import {TeacherHomeworkDetail} from "types";
import {convertToDate} from "api";

import {parseTeacherLessonDateMixin} from "../../timetable";

const parseTeacherHomeworkDetail = async (homework: TeacherHomeworkDetail) => {
    await parseTeacherLessonDateMixin(homework);
    convertToDate(homework, ["dueDate", "createdAt"]);
};

export default parseTeacherHomeworkDetail;
