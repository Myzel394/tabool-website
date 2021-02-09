import {TeacherLessonDetail} from "types";

import {parseTeacherCourseDetail} from "../../course";

const parseTeacherLessonDetail = async (lesson: TeacherLessonDetail) => {
    await parseTeacherCourseDetail(lesson.course);
};

export default parseTeacherLessonDetail;
