import {StudentHomeworkApprox} from "types";
import {convertToDate} from "api";

import {parseStudentLessonDateMixin} from "../../timetable";

const parseStudentHomeworkApprox = async (homework: StudentHomeworkApprox) => {
    await parseStudentLessonDateMixin(homework);
    convertToDate(homework, ["dueDate"]);
};

export default parseStudentHomeworkApprox;
