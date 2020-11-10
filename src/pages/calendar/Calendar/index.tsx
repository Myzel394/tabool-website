import React, {useMemo, useState} from "react";
import {Calendar as BigCalendar, Event as CalendarEvent, momentLocalizer, View} from "react-big-calendar";
import moment from "moment";
import {isMobile} from "react-device-detect";

import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs, {Dayjs} from "dayjs";
import {useWindowSize} from "hooks";
import {replaceDatetime} from "utils";

import Toolbar from "./Toolbar";
import Event from "./Event";

export interface ICalendar {
    events: CalendarEvent[];
    date: Dayjs;
    onDateChange: (selectedDate: Dayjs) => any;
}

const Calendar = ({events, date, onDateChange}: ICalendar) => {
    const [activeView, setActiveView] = useState<View>(isMobile ? "day" : "work_week");
    const [width, height] = useWindowSize();
    const [minTime, maxTime] = useMemo(() => {
        const startTimes = events.map(element =>
            replaceDatetime(dayjs(element.start), "date").unix());
        const endTimes = events.map(element =>
            replaceDatetime(dayjs(element.end), "date").unix());
        const minUnix = Math.min(...startTimes);
        const maxUnix = Math.max(...endTimes);

        return [
            dayjs.unix(minUnix).subtract(20, "minute"),
            dayjs.unix(maxUnix).subtract(20, "minute"),
        ];
    }, [events]);
    const calendarHeight = Math.min(1500, Math.max(500, height));
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
            events={events}
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

export default Calendar;

export {default as Skeleton} from "./Skeleton";
export {default as NoDataAvailable} from "./NoDataAvailable";

