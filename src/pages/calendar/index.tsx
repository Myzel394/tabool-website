import React, {ReactNode, useContext, useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {combineDatetime, findNextDate, getISODatetime} from "utils";
import {setBeginTime, setEndTime} from "utils/setTime";
import {View} from "react-big-calendar";
import {isMobile} from "react-device-detect";
import {useQuery} from "react-query";
import {useDeviceWidth, useQueryOptions, useQueryString, useUserPreferences} from "hooks";
import {AxiosError} from "axios";
import {IFetchTimetableData, IFetchTimetableResponse, useFetchTimetableAPI} from "hooks/apis";
import {useTranslation} from "react-i18next";
import {ErrorContext} from "contexts";

import CalendarContext, {CalendarType} from "./CalendarContext";
import {Skeleton} from "./Calendar/states";
import {LessonCalendar} from "./Calendar/calendars";
import HomeworkCalendar from "./Calendar/calendars/HomeworkCalendar";


const getStartDate = (targetedDate: Dayjs | undefined = undefined): Dayjs =>
    setBeginTime(
        findNextDate(
            (targetedDate ?? dayjs()).subtract(4, "day"),
            1,
        ),
    );

const getEndDate = (startDate: Dayjs): Dayjs =>
    setEndTime(
        findNextDate(
            startDate,
            5,
        ),
    );

const constrainWeekToDayData = (data: IFetchTimetableResponse, date: Dayjs): IFetchTimetableResponse => {
    const startDatetime = setBeginTime(date).subtract(1, "millisecond");
    const endDatetime = setEndTime(date).add(1, "millisecond");

    const {events, lessons} = data;

    const constrainedLessons = lessons.filter(lesson =>
        combineDatetime(lesson.date, lesson.lessonData.startTime).isAfter(startDatetime) &&
        combineDatetime(lesson.date, lesson.lessonData.endTime).isBefore(endDatetime));
    const constrainedEvents = events.filter(event =>
        event.startDatetime.isAfter(startDatetime) && event.endDatetime.isBefore(endDatetime));

    return {
        ...data,
        events: constrainedEvents,
        lessons: constrainedLessons,
    };
};

const Calendar = () => {
    // Options
    const {
        date: queryDateStr,
    } = useQueryString();
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchTimetable = useFetchTimetableAPI();
    const {isMD} = useDeviceWidth();
    const {dispatch: dispatchError} = useContext(ErrorContext);
    const {
        state,
        update,
    } = useUserPreferences();

    // States
    const [activeView, setActiveView] = useState<View>(() => (isMobile ? "day" : "work_week"));
    const [activeType, setActiveType] = useState<CalendarType>("lesson");
    const [activeDate, setActiveDate] = useState<Dayjs>(() => {
        if (typeof queryDateStr === "string") {
            const date = dayjs(queryDateStr);

            if (date.isValid()) {
                return date;
            }
        }

        return getStartDate();
    });

    const showFreePeriods = state?.timetable?.showFreePeriods ?? true;
    const showDetails = state?.timetable?.showDetails ?? !isMobile;

    // Data
    const startDate = getStartDate(activeDate);
    const endDate = getEndDate(startDate);
    const timetableData = {
        startDatetime: getISODatetime(startDate),
        endDatetime: getISODatetime(endDate),
    };


    const {
        data,
        isLoading,
        refetch,
    } = useQuery<IFetchTimetableResponse, AxiosError, IFetchTimetableData>(
        ["fetch_timetable", timetableData],
        () => fetchTimetable(timetableData),
        {
            ...queryOptions,
            onError: error => {
                if (error.response?.status === 501) {
                    dispatchError({
                        type: "setError",
                        payload: {
                            title: t("Stundenplan fehlt"),
                            message: t("Dein Stundenplan wurde noch nicht geladen. Er wird im Laufe des Tages automatisch geladen, dann kannst du ihn hier sehen."),
                        },
                    });
                }
            },
        },
    );

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

    if (isLoading || !data?.lessons || !data.events) {
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
                events: contextData?.events ?? [],
                exams: contextData?.exams ?? [],
                calendarType: activeType,
                date: activeDate,
                earliestDateAvailable: contextData?.earliestDateAvailable,
                latestDateAvailable: contextData?.latestDateAvailable,
                onCalendarTypeChange: setActiveType,
                onDateChange: changeDate,
                onViewChange: setActiveView,
                onShowFreePeriodsChange: update.timetable.setShowFreePeriod,
                onShowDetailsChange: update.timetable.setShowDetails,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};

export default Calendar;
