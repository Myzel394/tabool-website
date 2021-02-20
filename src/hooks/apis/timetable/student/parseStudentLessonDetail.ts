import {StudentLessonDetail} from "types";
import {convertToLocalWeekday} from "utils";

import {parseStudentCourseDetail} from "../../course";

const parseStudentLessonDetail = async (lesson: StudentLessonDetail) => {
    lesson.weekday = convertToLocalWeekday(lesson.weekday);

    await parseStudentCourseDetail(lesson.course);
};

export default parseStudentLessonDetail;
