import React, {useEffect, useState} from "react";
import {View} from "react-big-calendar";
import {isMobile} from "react-device-detect";
import {useFetchTimetableAPI, useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import dayjs, {Dayjs} from "dayjs";
import {findNextDate, getISODatetime} from "utils";
import {IFetchTimetableResponse} from "hooks/apis/fetch/useFetchTimetableAPI";
import {setBeginTime, setEndTime} from "utils/setTime";

import {Skeleton} from "./Calendar";
import {CalendarType} from "./Calendar/calendars/DefaultCalendar/Toolbar";
import LessonCalendar from "./Calendar/calendars/LessonCalendar";


const getStartDate = (): Dayjs => setBeginTime(
    findNextDate(
        dayjs().subtract(4, "day"),
        1,
    ),
);

const getEndDate = (startDate: Dayjs): Dayjs => setEndTime(
    findNextDate(
        startDate,
        5,
    ),
);

const Calendar = () => {
    const queryOptions = useQueryOptions();
    const fetchTimetable = useFetchTimetableAPI();

    const [renderingTimes, setRenderingTimes] = useState<number>(0);
    const [activeView, setActiveView] = useState<View>(isMobile ? "day" : "work_week");
    const [activeType, setActiveType] = useState<CalendarType>("lesson");
    const [showFreePeriods, setShowFreePeriods] = useState<boolean>(true);
    const [startDate, setStartDate] = useState<Dayjs>(getStartDate);
    const endDate = getEndDate(startDate);
    const {data, isLoading} = useQuery<IFetchTimetableResponse>(["fetch_timetable", {
        startDatetime: getISODatetime(startDate),
        endDatetime: getISODatetime(endDate),
    }], fetchTimetable, queryOptions);

    useEffect(() => {
        if (!isLoading) {
            setRenderingTimes(prevState => prevState + 1);
        }
    }, [isLoading, data]);

    // Reset rendering times
    useEffect(() => {
        setRenderingTimes(0);
    }, [startDate]);

    if (isLoading || !data?.lessons || !data.events || !data.homeworks || !data.modifications || !data.materials) {
        return <Skeleton />;
    }

    switch (activeType) {
        case "lesson":
            return (
                <LessonCalendar
                    materials={data.materials}
                    activeView={activeView}
                    activeType={activeType}
                    lessons={data.lessons}
                    events={data.events}
                    modifications={data.modifications}
                    activeDate={startDate}
                    homeworks={data.homeworks}
                    hasOnceAnimated={renderingTimes >= 2}
                    showFreePeriods={showFreePeriods}
                    onCalendarTypeChange={setActiveType}
                    onViewChange={setActiveView}
                    onDateChange={setStartDate}
                    onShowFreePeriodsChange={setShowFreePeriods}
                />

            );
    }

    return null;
};

export default Calendar;
