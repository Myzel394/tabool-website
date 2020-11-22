import React, {ReactNode, useState} from "react";
import {View} from "react-big-calendar";
import {isMobile} from "react-device-detect";
import {useFetchTimetableAPI, useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import dayjs, {Dayjs} from "dayjs";
import {combineDatetime, findNextDate, getISODatetime} from "utils";
import {IFetchTimetableResponse} from "hooks/apis/fetch/useFetchTimetableAPI";
import {setBeginTime, setEndTime} from "utils/setTime";

import {LessonCalendar, Skeleton} from "./Calendar";
import CalendarContext, {CalendarType} from "./CalendarContext";


const getStartDate = (): Dayjs => setBeginTime(
    findNextDate(
        dayjs().subtract(4, "day"),
        1,
    ),
);

const getEndDate = (startDate: Dayjs): Dayjs => {
    return setEndTime(
        findNextDate(
            startDate,
            5,
        ),
    );
};

const constrainWeekToDayData = (data: IFetchTimetableResponse, date: Dayjs): IFetchTimetableResponse => {
    const startDatetime = setBeginTime(date).subtract(1, "millisecond");
    const endDatetime = setEndTime(date).add(1, "millisecond");

    const {events, homeworks, lessons, materials, modifications} = data;

    const constrainedLessons = lessons.filter(lesson =>
        combineDatetime(lesson.date, lesson.lessonData.startTime).isAfter(startDatetime) &&
        combineDatetime(lesson.date, lesson.lessonData.endTime).isBefore(endDatetime));
    const lessonIds = constrainedLessons.map(lesson => lesson.id);
    const constrainedEvents = events.filter(event =>
        event.startDatetime.isAfter(startDatetime) && event.endDatetime.isBefore(endDatetime));
    const constrainedHomeworks = homeworks.filter(homework =>
        lessonIds.includes(homework.lesson));
    const constrainedMaterials = materials.filter(material =>
        lessonIds.includes(material.lesson));
    const constrainedModifications = modifications.filter(modification =>
        lessonIds.includes(modification.lesson.id));

    return {
        ...data,
        events: constrainedEvents,
        homeworks: constrainedHomeworks,
        lessons: constrainedLessons,
        materials: constrainedMaterials,
        modifications: constrainedModifications,
    };
};

const Calendar = () => {
    // Options
    const queryOptions = useQueryOptions();
    const fetchTimetable = useFetchTimetableAPI();

    // States
    const [activeView, setActiveView] = useState<View>(isMobile ? "day" : "work_week");
    const [activeType, setActiveType] = useState<CalendarType>("lesson");
    const [activeDate, setActiveDate] = useState<Dayjs>(getStartDate);
    const [showFreePeriods, setShowFreePeriods] = useState<boolean>(true);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Dayjs>(activeDate);

    // Data
    const endDate = getEndDate(startDate);
    const {data, isLoading} = useQuery<IFetchTimetableResponse>(["fetch_timetable", {
        startDatetime: getISODatetime(startDate),
        endDatetime: getISODatetime(endDate),
    }], fetchTimetable, queryOptions);

    // Values
    const changeDate = (rawValue: Dayjs) => {
        let value: Dayjs = rawValue;

        switch (rawValue.day()) {
            case 0:
                value = rawValue.subtract(2, "day");
                break;
            case 6:
                value = rawValue.add(2, "day");
        }

        setActiveDate(value);

        setStartDate(
            findNextDate(
                value.subtract(6, "day"),
                1,
            ),
        );
    };
    let children: ReactNode;
    let contextData: IFetchTimetableResponse | undefined = data;

    if (isLoading || !data?.lessons || !data.events || !data.homeworks || !data.modifications || !data.materials) {
        children = <Skeleton startDate={startDate} endDate={endDate} />;
    } else {
        switch (activeType) {
            case "lesson": {
                switch (activeView) {
                    case "day":
                        contextData = constrainWeekToDayData(data, activeDate);
                }

                children = <LessonCalendar />;
                break;
            }
        }
    }

    return (
        <CalendarContext.Provider
            value={{
                activeView,
                showFreePeriods,
                showDetails,
                lessons: contextData?.lessons ?? [],
                homeworks: contextData?.homeworks ?? [],
                modifications: contextData?.modifications ?? [],
                materials: contextData?.materials ?? [],
                events: contextData?.events ?? [],
                calendarType: activeType,
                date: activeDate,
                earliestDateAvailable: contextData?.earliestDateAvailable,
                latestDateAvailable: contextData?.latestDateAvailable,
                onCalendarTypeChange: setActiveType,
                onDateChange: changeDate,
                onViewChange: setActiveView,
                onShowFreePeriodsChange: setShowFreePeriods,
                onShowDetailsChange: setShowDetails,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};

export default Calendar;
