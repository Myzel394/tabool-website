import {StudentExamDetail, StudentModificationDetail, StudentWeekView} from "types";
import {getISODate, getPerUniqueValue} from "utils";
import {Event as CalendarEvent} from "react-big-calendar";
import {ExamIcon, ModificationIcon} from "components";

import {ITimetableContext} from "./TimetableContext";


const parseModification = (modification: StudentModificationDetail): CalendarEvent => ({
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
const parseExam = (exam: StudentExamDetail): CalendarEvent => ({
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

const getEvents = (timetable: StudentWeekView, view: ITimetableContext["view"]): CalendarEvent[] => {
    switch (view) {
        case "month": {
            const modificationsPerDay = getPerUniqueValue(timetable.modifications, {
                getKey: modification => getISODate(modification.lessonDate),
            });
            const examsPerDay = getPerUniqueValue(timetable.exams, {
                getKey: exam => getISODate(exam.date),
            });
            return [
                ...Object.values(modificationsPerDay).flat().map(parseModification),
                ...Object.values(examsPerDay).flat().map(parseExam),
            ];
        }

    }
    return [];
};

export default getEvents;
