import React, {memo, useMemo, useState} from "react";
import {View} from "react-big-calendar";
import {useTranslation} from "react-i18next";
import {findNextDate} from "utils";
import dayjs, {Dayjs} from "dayjs";
import {useFetchTimetableState} from "hooks";

import {DefaultCalendar, Skeleton} from "../index";
import {ITypeChanger, IViewChanger} from "../Toolbar";

import {buildCalendarEvents} from "./lessonCalendarUtils";

export interface ILessonCalendar {
    activeView: View;
    onViewChange: IViewChanger["onChange"];
    onCalendarTypeChange: ITypeChanger["onChange"];
}

const getStartDate = (): Dayjs => findNextDate(dayjs().subtract(4, "day"), 1)
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);


const getEndDate = (startDate: Dayjs): Dayjs => findNextDate(startDate, 5)
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59)
    .set("millisecond", 9999);


const LessonCalendar = ({activeView, onViewChange, onCalendarTypeChange}: ILessonCalendar) => {
    const {t} = useTranslation();
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
