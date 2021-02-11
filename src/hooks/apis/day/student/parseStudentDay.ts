import {StudentDayView} from "types";

import {parseEventDetail} from "../../event";
import {parseStudentExamDetail} from "../../exam";
import {parseStudentLessonDetail} from "../../timetable";
import {parseStudentMaterialDetail} from "../../material";
import {parseStudentModificationDetail} from "../../modification";

const parseStudentDay = async (day: StudentDayView) => {
    await Promise.allSettled([
        ...day.events.map(parseEventDetail),
        ...day.exams.map(parseStudentExamDetail),
        ...day.lessons.map(parseStudentLessonDetail),
        ...day.materials.map(parseStudentMaterialDetail),
        ...day.modifications.map(parseStudentModificationDetail),
    ]);
};

export default parseStudentDay;
