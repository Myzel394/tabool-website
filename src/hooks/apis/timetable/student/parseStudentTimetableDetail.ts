import {StudentTimetableDetail} from "types";

import parseStudentLessonDetail from "./parseStudentLessonDetail";

const parseStudentTimetableDetail = async (timetable: StudentTimetableDetail) => {
    await Promise.all(timetable.lessons.map(parseStudentLessonDetail));
};

export default parseStudentTimetableDetail;
