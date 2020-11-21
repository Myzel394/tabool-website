import React, {ReactNode, useEffect, useState} from "react";
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

const getEndDate = (startDate: Dayjs, activeView: View): Dayjs => {
    switch (activeView) {
        case "work_week":
            return setEndTime(
                findNextDate(
                    startDate,
                    5,
                ),
            );
        case "day":
            return setEndTime(startDate);
        default:
            return setEndTime(
                findNextDate(
                    startDate,
                    7,
                ),
            );
    }
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
    const queryOptions = useQueryOptions();
    const fetchTimetable = useFetchTimetableAPI();

    const [isSettingsExpanded, setIsSettingsExpanded] = useState<boolean>(!isMobile);
    const [activeView, setActiveView] = useState<View>(isMobile ? "day" : "work_week");
    const [activeType, setActiveType] = useState<CalendarType>("lesson");
    const [activeDate, setActiveDate] = useState<Dayjs>(getStartDate);
    const [isCalendarOpened, setIsCalendarOpened] = useState<boolean>(false);
    const [showFreePeriods, setShowFreePeriods] = useState<boolean>(true);
    const [startDate, setStartDate] = useState<Dayjs>(activeDate);
    const endDate = getEndDate(startDate, activeView);
    const {data, isLoading, isFetchedAfterMount} = useQuery<IFetchTimetableResponse>(["fetch_timetable", {
        startDatetime: getISODatetime(startDate),
        endDatetime: getISODatetime(endDate),
    }], fetchTimetable, queryOptions);
    let children: ReactNode;

    // Set start date
    useEffect(() => {
        if (startDate.day() !== 1 || !activeDate.isSame(startDate, "week")) {
            setStartDate(
                findNextDate(
                    activeDate.subtract(6, "day"),
                    1,
                ),
            );
        }
    }, [activeDate, activeView, startDate]);


    if (isLoading || !data?.lessons || !data.events || !data.homeworks || !data.modifications || !data.materials) {
        children = <Skeleton startDate={startDate} endDate={endDate} />;
    } else {
        switch (activeType) {
            case "lesson": {
                let lessonData: IFetchTimetableResponse = data;

                switch (activeView) {
                    case "day":
                        lessonData = constrainWeekToDayData(data, activeDate);
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
                isSettingsExpanded,
                isCalendarOpened,
                lessons: data?.lessons ?? [],
                homeworks: data?.homeworks ?? [],
                modifications: data?.modifications ?? [],
                materials: data?.materials ?? [],
                events: data?.events ?? [],
                calendarType: activeType,
                date: activeDate,
                earliestDateAvailable: data?.earliestDateAvailable,
                latestDateAvailable: data?.latestDateAvailable,
                animate: !isFetchedAfterMount,
                onCalendarTypeChange: setActiveType,
                onDateChange: setActiveDate,
                onViewChange: setActiveView,
                onShowFreePeriodsChange: setShowFreePeriods,
                onIsSettingsExpandedChange: setIsSettingsExpanded,
                onCalendarOpenedChange: setIsCalendarOpened,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};

export default Calendar;
