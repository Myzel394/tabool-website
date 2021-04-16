import dayjs from "dayjs";

import {StudentLessonDetail, TeacherLessonDetail} from "../types";

import getStartTime from "./getStartTime";
import replaceDatetime from "./replaceDatetime";
import getEndTime from "./getEndTime";

export default function getCurrentLesson(lessons: StudentLessonDetail[]): StudentLessonDetail | null;
export default function getCurrentLesson(lessons: TeacherLessonDetail[]): TeacherLessonDetail | null;

export default function getCurrentLesson(
    lessons: (StudentLessonDetail | TeacherLessonDetail)[],
): StudentLessonDetail | TeacherLessonDetail | null {
    const now = dayjs();
    const weekday = now.day();
    const nowAsDate = replaceDatetime(now, "time");

    return lessons.find(
        lesson =>
            lesson.weekday === weekday &&
        replaceDatetime(dayjs(getStartTime(lesson.startHour)), "time").isBefore(nowAsDate) &&
        replaceDatetime(dayjs(getEndTime(lesson.endHour)), "time").isAfter(nowAsDate),
    ) || null;
}
