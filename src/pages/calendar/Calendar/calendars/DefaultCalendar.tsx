import React from "react";
import {useWindowSize} from "hooks";
import {useMemo, useState} from "react";
import {Calendar as BigCalendar, Event as CalendarEvent, momentLocalizer, View, CalendarProps} from "react-big-calendar";
import Toolbar from "../Toolbar";
import Event from "../Event";
import moment from "moment";
import dayjs, {Dayjs} from "dayjs";
import {replaceDatetime} from "utils";
import update from "immutability-helper";

export interface IDefaultCalendar extends Omit<CalendarProps,
    "localizer"
    | "components"
    | "step"
    | "views"
    | "min"
    | "max"
    | "dayLayoutAlgorithm"> {
    events: CalendarEvent[];
    onViewChange: (newView: View) => any;
}

const getMinMaxTime = (events: CalendarEvent[]): [Date, Date] => {
    const startTimes = events.map(element =>
        replaceDatetime(dayjs(element.start), "date").unix());
    const endTimes = events.map(element =>
        replaceDatetime(dayjs(element.end), "date").unix());
    const minUnix = Math.min(...startTimes);
    const maxUnix = Math.max(...endTimes);

    return [
        dayjs.unix(minUnix).subtract(10, "minute").toDate(),
        dayjs.unix(maxUnix).subtract(10, "minute").toDate(),
    ];
}

const DefaultCalendar = ({
     style: givenStyles = {},
     events,
     date,
    view,
    onViewChange,
     ...other
}: IDefaultCalendar) => {
    const [x, height] = useWindowSize();

    const [minTime, maxTime] = useMemo(() => getMinMaxTime(events), [events]);
    const style = useMemo(() => update(givenStyles, {
        height: {
            $set: Math.min(1500, Math.max(500, height))
        }
    }), [height]);
    const components = useMemo(() => ({
        toolbar: Toolbar({
            onViewChange,
        }),
        eventWrapper: Event,
    }), []);
    const localizer = useMemo(() => momentLocalizer(moment), []);

    return <BigCalendar
        views={["work_week", "day"]}
        localizer={localizer}
        style={style}
        min={minTime}
        max={maxTime}
        view={view}
        step={30}
        dayLayoutAlgorithm="overlap"
        date={date}
        components={components}
        events={events}
        {...other}
    />
}

export default DefaultCalendar;

