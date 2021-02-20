import {TeacherLessonDetail} from "types";
import {convertToLocalWeekday} from "utils";

import {parseTeacherCourseDetail} from "../../course";

const parseTeacherLessonDetail = async (lesson: TeacherLessonDetail) => {
    lesson.weekday = convertToLocalWeekday(lesson.weekday);

    await parseTeacherCourseDetail(lesson.course);
};

export default parseTeacherLessonDetail;
