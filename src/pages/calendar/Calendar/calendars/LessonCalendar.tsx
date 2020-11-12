import React, {memo, useMemo, useState} from "react";
import {Dayjs} from "dayjs";
import {useFetchTimetableState} from "hooks";

import {DefaultCalendar, Skeleton} from "../index";

import {buildCalendarEvents, getEndDate, getStartDate} from "./lessonCalendarUtils";
import {IDefaultCalendarManager} from "../DefaultCalendar";

export interface ILessonCalendar extends IDefaultCalendarManager {}

const LessonCalendar = ({activeView, onViewChange, onCalendarTypeChange}: ILessonCalendar) => {
    const [startDate, setStartDate] = useState<Dayjs>(getStartDate);
    const endDate = useMemo<Dayjs>(() => getEndDate(startDate),
        [startDate]);

    const {
        lessons,
        modifications,
        events,
        lessonsFetching,
    } = useFetchTimetableState(startDate, endDate);

    if (lessonsFetching && (lessons?.length ?? 0) === 0) {
        return <Skeleton />;
    }

    const calendarEvents = buildCalendarEvents({
        lessons,
        modifications,
        events,
    });

    return (
        <DefaultCalendar
            events={calendarEvents}
            calendarType="lesson"
            view={activeView}
            date={startDate}
            onViewChange={onViewChange}
            onCalendarTypeChange={onCalendarTypeChange}
            onDateChange={setStartDate}
        />
    );
};

export default memo(LessonCalendar);
