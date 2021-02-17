import {StudentWeekView} from "types";

import {parseEventDetail} from "../../event";
import {parseStudentExamDetail} from "../../exam";
import {parseStudentLessonDetail} from "../../timetable";
import {parseStudentMaterialDetail} from "../../material";
import {parseStudentModificationDetail} from "../../modification";

const parseStudentWeek = async (day: StudentWeekView) => {
    await Promise.allSettled([
        ...day.events.map(parseEventDetail),
        ...day.exams.map(parseStudentExamDetail),
        ...day.lessons.map(parseStudentLessonDetail),
        ...day.materials.map(parseStudentMaterialDetail),
        ...day.modifications.map(parseStudentModificationDetail),
    ]);
};

export default parseStudentWeek;
