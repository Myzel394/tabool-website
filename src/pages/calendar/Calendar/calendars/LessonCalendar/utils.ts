import {EventDetail, LessonDetail, ModificationDetail} from "types";
import {combineDatetime, randomNumbersWithGap, replaceDatetime} from "utils";
import {Event as CalendarEvent} from "react-big-calendar";

interface IBuildCalendarEvents {
    lessons?: LessonDetail[];
    modifications?: ModificationDetail[];
    events?: EventDetail[];
}

export const buildCalendarEvents = ({
    lessons,
    modifications,
    events,
}: IBuildCalendarEvents): CalendarEvent[] => {
    const randomNumbers = randomNumbersWithGap(0, 600, 50, lessons?.length ?? 0);

    const calendarLessons = (lessons ?? []).map(
        (lesson, index: number): CalendarEvent => ({
            start: combineDatetime(lesson.date, lesson.lessonData.startTime).toDate(),
            end: combineDatetime(lesson.date, lesson.lessonData.endTime).toDate(),
            title: lesson.lessonData.course.name,
            allDay: false,
            resource: {
                ...lesson,
                type: "lesson",
                delay: randomNumbers[index],
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
    // Get modifications, that can't don't apply to the full lesson
    const extraModifications = (modifications ?? []).filter(modification => {
        const startTime = replaceDatetime(modification.startDatetime, "date");
        const endTime = replaceDatetime(modification.endDatetime, "date");
        const lessonStartTime = replaceDatetime(modification.lesson.lessonData.startTime, "date");
        const lessonEndTime = replaceDatetime(modification.lesson.lessonData.endTime, "date");

        return !(
            startTime.isSame(lessonStartTime) &&
                endTime.isSame(lessonEndTime)
        );
    })
        .map((modification): CalendarEvent => ({
            start: modification.startDatetime.toDate(),
            end: modification.endDatetime.toDate(),
            title: modification.lesson.lessonData.course.name,
            resource: {
                ...modification,
                type: "modification",
            },
        }));

    return [
        ...calendarLessons,
        ...calendarEvents,
        ...extraModifications,
    ];
};
