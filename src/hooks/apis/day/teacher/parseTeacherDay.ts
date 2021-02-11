import {TeacherDayView} from "types";

import {parseEventDetail} from "../../event";
import {parseTeacherExamDetail} from "../../exam";
import {parseTeacherLessonDetail} from "../../timetable";
import {parseTeacherMaterialDetail} from "../../material";
import {parseTeacherModificationDetail} from "../../modification";

const parseTeacherDay = async (day: TeacherDayView) => {
    await Promise.allSettled([
        ...day.events.map(parseEventDetail),
        ...day.exams.map(parseTeacherExamDetail),
        ...day.lessons.map(parseTeacherLessonDetail),
        ...day.materials.map(parseTeacherMaterialDetail),
        ...day.modifications.map(parseTeacherModificationDetail),
    ]);
};

export default parseTeacherDay;
