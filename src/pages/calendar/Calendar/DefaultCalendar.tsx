import React, {useMemo} from "react";
import {useWindowSize} from "hooks";
import {
    Calendar as BigCalendar,
    CalendarProps,
    Event as CalendarEvent,
    momentLocalizer,
    View
} from "react-big-calendar";
import moment from "moment";
import dayjs, {Dayjs} from "dayjs";
import {replaceDatetime} from "utils";
import update from "immutability-helper";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Toolbar, {ITypeChanger, IViewChanger} from "./Toolbar";
import Event from "./Event";


export interface IDefaultCalendar extends Omit<CalendarProps,
    "localizer"
    | "components"
    | "step"
    | "views"
    | "min"
    | "max"
    | "dayLayoutAlgorithm"
    | "date"> {
    events: CalendarEvent[];
    onViewChange: IViewChanger["onChange"];
    onCalendarTypeChange: ITypeChanger["onChange"];
    calendarType: ITypeChanger["activeType"];
    onDateChange: (newDate: Dayjs) => any;
    date: Dayjs;
}

export interface IDefaultCalendarManager {
    activeView: View;
    onViewChange: IViewChanger["onChange"];
    onCalendarTypeChange: ITypeChanger["onChange"];
}

const timePadding = 20;

const getMinMaxTime = (events: CalendarEvent[]): [Date, Date] => {
    const startTimes = events.map(element =>
        replaceDatetime(dayjs(element.start), "date").unix());
    const endTimes = events.map(element =>
        replaceDatetime(dayjs(element.end), "date").unix());
    const minUnix = Math.min(...startTimes);
    const maxUnix = Math.max(...endTimes);

    return [
        dayjs.unix(minUnix).subtract(timePadding, "minute").toDate(),
        dayjs.unix(maxUnix).add(timePadding, "minute").toDate(),
    ];
};


const DefaultCalendar = ({
    style: givenStyles = {},
    events,
    date,
    view,
    onViewChange,
    onCalendarTypeChange,
    calendarType,
    onDateChange,
    ...other
}: IDefaultCalendar) => {
    const height = useWindowSize()[1];

    const [minTime, maxTime] = useMemo(() => getMinMaxTime(events), [events]);
    const style = useMemo(() => update(givenStyles, {
        height: {
            $set: Math.min(1500, Math.max(500, height)),
        },
    }), [givenStyles, height]);
    const components = useMemo(() => ({
        toolbar: Toolbar({
            onViewChange,
            onCalendarTypeChange,
            calendarType,
        }),
        eventWrapper: Event,
    }), [calendarType, onCalendarTypeChange, onViewChange]);
    const localizer = useMemo(() => momentLocalizer(moment), []);

    return (
        <BigCalendar
            views={["work_week", "day"]}
            localizer={localizer}
            style={style}
            min={minTime}
            max={maxTime}
            view={view}
            step={30}
            dayLayoutAlgorithm="overlap"
            date={date.toDate()}
            components={components}
            events={events}
            onNavigate={date => onDateChange(dayjs(date))}
            {...other}
        />
    );
};

export default DefaultCalendar;

