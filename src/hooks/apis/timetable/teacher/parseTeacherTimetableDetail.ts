import {TeacherTimetableDetail} from "types";

import parseTeacherLessonDetail from "./parseTeacherLessonDetail";

const parseTeacherTimetableDetail = async (timetable: TeacherTimetableDetail) => {
    await Promise.all(timetable.lessons.map(parseTeacherLessonDetail));
};

export default parseTeacherTimetableDetail;
