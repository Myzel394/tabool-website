import React, {ReactNode, useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {combineDatetime, findNextDate, getISODatetime} from "utils";
import {IFetchTimetableResponse} from "hooks/apis/fetch/useFetchTimetableAPI";
import {setBeginTime, setEndTime} from "utils/setTime";
import {View} from "react-big-calendar";
import {isMobile} from "react-device-detect";
import {useQuery} from "react-query";
import {useDeviceWidth, useFetchTimetableAPI, usePersistentStorage, useQueryOptions} from "hooks";

import CalendarContext, {CalendarType} from "./CalendarContext";
import {Skeleton} from "./Calendar/states";
import {LessonCalendar} from "./Calendar/calendars";
import HomeworkCalendar from "./Calendar/calendars/HomeworkCalendar";


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
        lessonIds.includes(homework.lesson.id));
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
    const {isMD} = useDeviceWidth();

    // States
    const [activeView, setActiveView] = useState<View>(() => (isMobile ? "day" : "work_week"));
    const [activeType, setActiveType] = useState<CalendarType>("lesson");
    const [activeDate, setActiveDate] = useState<Dayjs>(getStartDate);
    const [showFreePeriods, setShowFreePeriods] = usePersistentStorage<boolean>(true, "timetable_showFreePeriods");
    const [showDetails, setShowDetails] = usePersistentStorage<boolean>(!isMobile, "timetable_showDetails");
    const [startDate, setStartDate] = useState<Dayjs>(activeDate);

    // Data
    const endDate = getEndDate(startDate);
    const {data, isLoading, refetch} = useQuery<IFetchTimetableResponse>(["fetch_timetable", {
        startDatetime: getISODatetime(startDate),
        endDatetime: getISODatetime(endDate),
    }], fetchTimetable, queryOptions);

    // Functions
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

    // Effects
    // When homework selected, force day view on small devices
    useEffect(() => {
        if (!isMD && activeType === "homework" && activeView !== "day") {
            setActiveView("day");
        }
    }, [activeType, activeView, isMD, setActiveView]);

    // Values
    let children: ReactNode;
    let contextData: IFetchTimetableResponse | undefined = data;

    if (isLoading || !data?.lessons || !data.events || !data.homeworks || !data.modifications || !data.materials) {
        children = <Skeleton startDate={startDate} endDate={endDate} />;
    } else {
        // Type
        switch (activeType) {
            case "lesson": {
                children = <LessonCalendar />;
                break;
            }
            case "homework": {
                children = <HomeworkCalendar />;
                break;
            }
        }

        // View
        switch (activeView) {
            case "day":
                contextData = constrainWeekToDayData(data, activeDate);
        }
    }

    return (
        <CalendarContext.Provider
            value={{
                activeView,
                showFreePeriods,
                showDetails,
                refetch,
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
