import {StudentLessonDetail} from "types";

import {parseStudentCourseDetail} from "../../course";

const parseStudentLessonDetail = async (lesson: StudentLessonDetail) => {
    await parseStudentCourseDetail(lesson.course);
};

export default parseStudentLessonDetail;
