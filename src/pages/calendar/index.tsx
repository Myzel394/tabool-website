import React, {useMemo, useState} from "react";
import {View} from "react-big-calendar";
import {isMobile} from "react-device-detect";
import {useFetchTimetableAPI, useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import dayjs, {Dayjs} from "dayjs";
import {findNextDate, getISODatetime} from "utils";
import {IFetchTimetableResponse} from "hooks/apis/fetch/useFetchTimetableAPI";

import {Skeleton} from "./Calendar";
import {CalendarType} from "./Calendar/calendars/DefaultCalendar/Toolbar";
import LessonCalendar from "./Calendar/calendars/LessonCalendar";

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


const Calendar = () => {
    const queryOptions = useQueryOptions();
    const fetchTimetable = useFetchTimetableAPI();

    const [activeView, setActiveView] = useState<View>(isMobile ? "day" : "work_week");
    const [activeType, setActiveType] = useState<CalendarType>("lesson");
    const [startDate, setStartDate] = useState<Dayjs>(getStartDate);
    const endDate = useMemo<Dayjs>(() => getEndDate(startDate),
        [startDate]);
    const {data, isLoading} = useQuery<IFetchTimetableResponse>(["fetch_timetable", {
        startDatetime: getISODatetime(startDate),
        endDatetime: getISODatetime(endDate),
    }], fetchTimetable, queryOptions);

    if (isLoading || !data?.lessons || !data.events || !data.homeworks || !data.modifications || !data.materials) {
        return <Skeleton />;
    }

    switch (activeType) {
    case "lesson":
        return (
            <LessonCalendar
                activeDate={startDate}
                activeView={activeView}
                activeType={activeType}
                lessons={data.lessons}
                events={data.events}
                modifications={data.modifications}
                onDateChange={setStartDate}
                onCalendarTypeChange={setActiveType}
                onViewChange={setActiveView}
            />
        );
    }

    return null;
};

export default Calendar;
