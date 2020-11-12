import {EventDetail, LessonDetail, ModificationDetail} from "types";
import {combineDatetime, findNextDate, randomNumbersWithGap} from "utils";
import {Event as CalendarEvent} from "react-big-calendar";
import dayjs, {Dayjs} from "dayjs";

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
                    delay: 300,
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
                resource: modification,
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
                resource: event,
            }),
        ),
    ];

    return calendarLessons;
};

export const getStartDate = (): Dayjs => findNextDate(dayjs().subtract(4, "day"), 1)
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);

export const getEndDate = (startDate: Dayjs): Dayjs => findNextDate(startDate, 5)
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59)
    .set("millisecond", 9999);
