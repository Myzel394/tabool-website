import {TeacherHomeworkApprox} from "types";
import {convertToDate} from "api";

import {parseTeacherLessonDateMixin} from "../../timetable";

const parseTeacherHomeworkApprox = async (homework: TeacherHomeworkApprox) => {
    await parseTeacherLessonDateMixin(homework);
    convertToDate(homework, ["dueDate"]);
};

export default parseTeacherHomeworkApprox;
