import {
    StudentExamDetail,
    StudentHomeworkDetail,
    StudentLessonDetail,
    StudentMaterialDetail,
    StudentModificationDetail,
    StudentWeekView,
} from "types";
import {
    combineDatetime,
    findNextDate,
    getEndTime,
    getISODate,
    getPerUniqueValue,
    getStartTime,
    isDateEqual,
} from "utils";
import {Event as CalendarEvent} from "react-big-calendar";
import {ExamIcon, ModificationIcon} from "components";
import dayjs, {Dayjs} from "dayjs";

import {ITimetableContext} from "./TimetableContext";

export interface DayLessonResource extends StudentLessonDetail {
    type: "lesson";
    materialCount: number;
    homeworkCount: number;
    hasExam: boolean;
    modifications: StudentModificationDetail[];
}

const parseMonthModification = (modification: StudentModificationDetail): CalendarEvent => ({
    start: modification.lessonDate.toDate(),
    end: modification.lessonDate.toDate(),
    title: modification.lesson.course.name,
    resource: {
        ...modification,
        type: "modification",
        color: modification.lesson.course.subject.userRelation.color,
        icon: ModificationIcon,
    },
});
const parseMonthExam = (exam: StudentExamDetail): CalendarEvent => ({
    start: exam.date.toDate(),
    end: exam.date.toDate(),
    title: exam.title,
    resource: {
        ...exam,
        type: "exam",
        color: exam.course.subject.userRelation.color,
        icon: ExamIcon,
    },
});

const getEvents = (
    timetable: StudentWeekView,
    view: ITimetableContext["view"],
    startDate: Dayjs,
): CalendarEvent[] => {
    switch (view) {
        case "month": {
            const modificationsPerDay = getPerUniqueValue(timetable.modifications, {
                getKey: modification => getISODate(modification.lessonDate),
            });
            const examsPerDay = getPerUniqueValue(timetable.exams, {
                getKey: exam => getISODate(exam.date),
            });
            return [
                ...Object.values(modificationsPerDay)
                    .flat()
                    .map(parseMonthModification),
                ...Object.values(examsPerDay)
                    .flat()
                    .map(parseMonthExam),
            ];
        }
        case "work_week":
        case "day": {
            const {
                lessons,
                exams,
                modifications,
                materials,
                homeworks,
            } = timetable;

            return lessons.map(lesson => {
                const dayForWeekday = findNextDate(startDate, lesson.weekday);

                return {
                    start: combineDatetime(
                        dayForWeekday,
                        dayjs(getStartTime(lesson.startHour)),
                    )
                        .toDate(),
                    end: combineDatetime(
                        dayForWeekday,
                        dayjs(getEndTime(lesson.endHour)),
                    )
                        .toDate(),
                    allDay: false,
                    title: lesson.course.name,
                    resource: {
                        ...lesson,
                        type: "lesson",
                        materialCount: materials.filter(material => material.lesson.id === lesson.id).length,
                        homeworkCount: homeworks.filter(homework => homework.lesson.id === lesson.id).length,
                        hasExam: exams.some(exam =>
                            exam.course.id === lesson.course.id &&
                            exam.date.day() === lesson.weekday),
                        modifications: modifications.filter(modification => modification.lesson.id === lesson.id),
                    },
                };
            });
        }

    }
    return [];
};

export const findHomeworks = (
    homeworks: StudentHomeworkDetail[],
    lesson: StudentLessonDetail,
    date: Dayjs,
): StudentHomeworkDetail[] =>
    homeworks.filter(homework =>
        homework.lesson.id === lesson.id &&
        isDateEqual(homework.lessonDate, date));


export const findMaterials = (
    materials: StudentMaterialDetail[],
    lesson: StudentLessonDetail,
    date: Dayjs,
): StudentMaterialDetail[] =>
    materials.filter(material =>
        material.lesson.id === lesson.id &&
        isDateEqual(material.lessonDate, date));


export default getEvents;
