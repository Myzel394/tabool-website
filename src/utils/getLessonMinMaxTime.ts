import {StudentLessonDetail, TeacherLessonDetail} from "types";

import getStartTime from "./getStartTime";
import getEndTime from "./getEndTime";

const getLessonMinMaxTime = (lessons: (StudentLessonDetail | TeacherLessonDetail)[]): [Date, Date] => {
    const minHour = Math.min(...lessons.map(lesson => lesson.startHour));
    const maxHour = Math.max(...lessons.map(lesson => lesson.endHour));

    const startTime = getStartTime(minHour);
    const endTime = getEndTime(maxHour);

    return [startTime, endTime];
};

export default getLessonMinMaxTime;
