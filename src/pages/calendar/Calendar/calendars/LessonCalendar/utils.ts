import {EventDetail, ExamDetail, LessonDetail} from "types";
import {combineDatetime} from "utils";
import {Event as CalendarEvent} from "react-big-calendar";

interface IBuildCalendarEvents {
    lessons?: LessonDetail[];
    events?: EventDetail[];
    exams?: ExamDetail[];
}

export const buildCalendarEvents = ({
    lessons,
    events,
    exams,
}: IBuildCalendarEvents): CalendarEvent[] => {
    const calendarLessons = (lessons ?? []).map(
        (lesson): CalendarEvent => ({
            start: combineDatetime(lesson.date, lesson.lessonData.startTime).toDate(),
            end: combineDatetime(lesson.date, lesson.lessonData.endTime).toDate(),
            title: lesson.lessonData.course.name,
            allDay: false,
            resource: {
                ...lesson,
                type: "lesson",
            },
        }),
    );
    const calendarEvents = (events ?? []).map(
        (event): CalendarEvent => ({
            start: event.startDatetime.toDate(),
            end: event.endDatetime.toDate(),
            title: event.title,
            allDay: event.isAllDay,
            resource: {
                ...event,
                type: "event",
            },
        }),
    );
    const calendarModifications = (lessons ?? []).reduce<CalendarEvent[]>(
        (array, lesson) => [
            ...array,
            ...lesson.modifications
                .filter(modification => !(
                    modification.startDatetime.isSame(combineDatetime(lesson.date, lesson.lessonData.startTime)) &&
                        modification.endDatetime.isSame(combineDatetime(lesson.date, lesson.lessonData.endTime))
                ))
                .map(modification => ({
                    start: modification.startDatetime.toDate(),
                    end: modification.endDatetime.toDate(),
                    title: lesson.lessonData.course.subject.name,
                    resource: {
                        ...modification,
                        type: "modification",
                    },
                })),
        ],
        [],
    );
    const calendarExams = (exams ?? []).map((exam): CalendarEvent => ({
        start: exam.targetedDate.toDate(),
        end: exam.targetedDate.toDate(),
        title: exam.course.subject.name,
        allDay: true,
        resource: {
            ...exam,
            type: "exam",
        },
    }));

    return [
        ...calendarLessons,
        ...calendarEvents,
        ...calendarModifications,
        ...calendarExams,
    ];
};
