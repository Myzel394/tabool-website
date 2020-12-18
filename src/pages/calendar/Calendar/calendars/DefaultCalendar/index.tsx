import React, {ComponentType, useContext, useMemo} from "react";
import {useWindowSize} from "hooks";
import {Calendar as BigCalendar, CalendarProps, Event as CalendarEvent, EventWrapperProps} from "react-big-calendar";
import dayjs from "dayjs";
import {combineDatetime, findNextDate, replaceDatetime} from "utils";
import update from "immutability-helper";

import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarContext from "../../../CalendarContext";

import localeInstance from "./locale";
import Toolbar from "./Toolbar";

export interface IDefaultCalendar<TEvent extends Record<string, any> = Record<string, any>> extends Omit<CalendarProps,
    "localizer"
    | "components"
    | "step"
    | "views"
    | "min"
    | "max"
    | "dayLayoutAlgorithm"
    | "date"
    > {
    events: CalendarEvent[];
    eventComponent: ComponentType<EventWrapperProps<TEvent>>;
}

const TIME_PADDING = 20;
const DEFAULT_MIN_TIME = dayjs().set("hour", 8).set("minute", 0)
    .set("second", 0);
const DEFAULT_MAX_TIME = dayjs().set("hour", 16).set("minute", 0)
    .set("second", 0);

const getMinMaxTime = (events: CalendarEvent[]): [Date, Date] => {
    const notAllDayEvents = events.filter(element => !element.allDay);

    const startTimes = notAllDayEvents.map(element =>
        replaceDatetime(dayjs(element.start), "date").unix());
    const endTimes = notAllDayEvents.map(element =>
        replaceDatetime(dayjs(element.end), "date").unix());
    const minUnix = Math.min(...startTimes);
    const maxUnix = Math.max(...endTimes);

    const minTime = dayjs.unix(minUnix);
    const maxTime = dayjs.unix(maxUnix);

    const minDatetime = combineDatetime(dayjs(), minTime).subtract(TIME_PADDING, "minute");
    const maxDatetime = combineDatetime(dayjs(), maxTime).add(TIME_PADDING, "minute");

    return [
        (minDatetime.isValid() ? minDatetime : DEFAULT_MIN_TIME).toDate(),
        (maxDatetime.isValid() ? maxDatetime : DEFAULT_MAX_TIME).toDate(),
    ];
};


const DefaultCalendar = ({
    style: givenStyles = {},
    events,
    eventComponent,
    ...other
}: IDefaultCalendar) => {
    const {date, activeView, onDateChange} = useContext(CalendarContext);

    const [, height] = useWindowSize();
    const [minTime, maxTime] = getMinMaxTime(events);
    const style = useMemo(() => update(givenStyles, {
        height: {
            $set: Math.min(2500, Math.max(800, height)),
        },
    }), [givenStyles, height]);
    const components = useMemo(() => ({
        toolbar: Toolbar,
        eventWrapper: eventComponent,
    }), [eventComponent]);

    return (
        <BigCalendar
            views={["work_week", "day"]}
            view={activeView}
            style={style}
            min={minTime}
            max={maxTime}
            localizer={localeInstance}
            step={30}
            dayLayoutAlgorithm="no-overlap"
            date={date.toDate()}
            components={components}
            events={events.length === 0 ? [] : events}
            onNavigate={date => {
                let value = dayjs(date);

                switch (value.day()) {
                    case 6:
                        value = findNextDate(value, 1);
                        break;
                    case 0:
                        value = findNextDate(value.subtract(6, "day"), 5);
                        break;
                }

                onDateChange(value);
            }}
            // View is handled by Toolbar
            onView={() => null}
            {...other}
        />
    );
};

export default DefaultCalendar;

