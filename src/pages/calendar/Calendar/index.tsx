import React, {memo, useMemo, useState} from "react";
import {Calendar as BigCalendar, Event as CalendarEvent, momentLocalizer, View} from "react-big-calendar";
import moment from "moment";
import {isMobile} from "react-device-detect";

import "react-big-calendar/lib/css/react-big-calendar.css";

import {EventDetail, LessonDetail, ModificationDetail} from "types";
import dayjs, {Dayjs} from "dayjs";
import {useWindowSize} from "hooks";
import {combineDatetime, randomNumbersWithGap, replaceDatetime} from "utils";

import Toolbar from "./Toolbar";
import Event from "./Event";

export interface ICalendar {
    lessons?: LessonDetail[];
    modifications?: ModificationDetail[];
    events?: EventDetail[];
    date: Dayjs;
    onDateChange: (selectedDate: Dayjs) => any;
}

const Calendar = ({lessons, modifications, events, date, onDateChange}: ICalendar) => {
    const [activeView, setActiveView] = useState<View>(isMobile ? "day" : "work_week");
    const [width, height] = useWindowSize();
    const randomNumbers = useMemo(() =>
        randomNumbersWithGap(0, 600, 50, lessons?.length ?? 0)
    , [lessons]);
    const calendarEvents: CalendarEvent[] = [
        ...(lessons ?? []).map((lesson, index): CalendarEvent => {
            const start = combineDatetime(lesson.date, lesson.lessonData.startTime),
                end = combineDatetime(lesson.date, lesson.lessonData.endTime);
            const delay = randomNumbers[index];

            return {
                start: start.toDate(),
                end: end.toDate(),
                title: lesson.lessonData.course.name,
                allDay: false,
                resource: {
                    ...lesson,
                    delay,
                },
            };
        }),
    ];
    const [minTime, maxTime] = useMemo(() => {
        const startTimes = calendarEvents.map(element =>
            replaceDatetime(dayjs(element.start), "date").unix());
        const endTimes = calendarEvents.map(element =>
            replaceDatetime(dayjs(element.end), "date").unix());
        const minUnix = Math.min(...startTimes);
        const maxUnix = Math.max(...endTimes);

        return [
            dayjs.unix(minUnix).subtract(20, "minute"),
            dayjs.unix(maxUnix).subtract(20, "minute"),
        ];
    }, [calendarEvents]);
    const calendarHeight = Math.min(1500, Math.max(500, height ?? 0));
    const style = useMemo(() => ({
        height: calendarHeight,
    }), [calendarHeight]);
    const components = useMemo(() => ({
        toolbar: Toolbar({
            onViewChange: setActiveView,
        }),
        eventWrapper: Event,
    }), []);
    const localizer = useMemo(() => momentLocalizer(moment), []);

    return (
        <BigCalendar
            localizer={localizer}
            events={calendarEvents}
            step={30}
            view={activeView}
            views={["work_week", "day"]}
            date={date.toDate()}
            style={style}
            components={components}
            dayLayoutAlgorithm="overlap"
            min={minTime.toDate()}
            max={maxTime.toDate()}
            onNavigate={date => onDateChange(dayjs(date))}
        />
    );
};

export default memo(Calendar);
