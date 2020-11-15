import {EventDetail, LessonDetail, ModificationDetail} from "types";
import {combineDatetime, randomNumbersWithGap} from "utils";
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

    const calendarLessons = [
        ...(lessons ?? []).map(
            (lesson: LessonDetail, index: number): CalendarEvent => ({
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
        )];
    const calendarModifications = [
        ...(modifications ?? []).map(
            (modification: ModificationDetail): CalendarEvent => ({
                start: modification.startDatetime.toDate(),
                end: modification.endDatetime.toDate(),
                title: "",
                allDay: false,
                resource: {
                    ...modification,
                    type: "modification",
                },
            }),
        ),
    ];
    const calendarEvents = [
        ...(events ?? []).map(
            (event: EventDetail): CalendarEvent => ({
                start: event.startDatetime.toDate(),
                end: event.endDatetime.toDate(),
                title: event.title,
                allDay: event.isAllDay,
                resource: {
                    ...event,
                    type: "event",
                },
            }),
        ),
    ];

    return [
        ...calendarLessons,
        ...calendarModifications,
        ...calendarEvents,
    ];
};
