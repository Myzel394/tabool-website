import React, {memo, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {combineDatetime, findNextDate, randomNumbersWithGap} from "utils";
import {useMemoOne} from "use-memo-one";
import useFetchTimetableState from "hooks/apis/fetch/useFetchTimetableState";
import {useTranslation} from "react-i18next";
import {EventDetail, LessonDetail, ModificationDetail} from "types";
import {Event as CalendarEvent} from "react-big-calendar";

import Calendar, {Skeleton} from "./Calendar";

export interface ICalendarManager {

}

interface IBuildCalendarEvents {
    lessons?: LessonDetail[];
    modifications?: ModificationDetail[];
    events?: EventDetail[];
}

const buildCalendarEvents = ({
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

const CalendarManager = ({}: ICalendarManager) => {
    const {t} = useTranslation();
    const [startDate, setStartDate] = useState<Dayjs>(() => findNextDate(dayjs().subtract(4, "day"), 1));
    const endDate = useMemoOne<Dayjs>(() =>
        findNextDate(startDate, 5),
    [startDate]);

    const {
        lessons,
        modifications,
        events,
        lessonsFetching,
        eventsFetching,
        modificationsFetching,
    } = useFetchTimetableState(startDate, endDate);

    if (lessonsFetching && (lessons?.length ?? 0) === 0) {
        return (
            <>
                <Skeleton />
            </>);
    }

    const calendarEvents = buildCalendarEvents({
        lessons,
        modifications,
        events,
    });

    return (
        <Calendar
            date={startDate}
            events={calendarEvents}
            onDateChange={setStartDate}
        />
    );
};

export default memo(CalendarManager);
