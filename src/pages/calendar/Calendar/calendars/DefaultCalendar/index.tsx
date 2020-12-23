import React, {ComponentType, useContext, useMemo} from "react";
import {useWindowSize} from "hooks";
import {Calendar as BigCalendar, CalendarProps, Event as CalendarEvent, EventWrapperProps} from "react-big-calendar";
import dayjs from "dayjs";
import {findNextDate, getMinMaxTime, locale} from "utils";
import update from "immutability-helper";

import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarContext from "../../../CalendarContext";

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

const DefaultCalendar = ({
    style: givenStyles = {},
    events,
    eventComponent,
    ...other
}: IDefaultCalendar) => {
    const {date, activeView, onDateChange} = useContext(CalendarContext);
    const [, height] = useWindowSize();

    const style = useMemo(() => update(givenStyles, {
        height: {
            $set: Math.min(2500, Math.max(800, height)),
        },
    }), [givenStyles, height]);
    const components = useMemo(() => ({
        toolbar: Toolbar,
        eventWrapper: eventComponent,
    }), [eventComponent]);

    const [minTime, maxTime] = getMinMaxTime(events);

    return (
        <BigCalendar
            views={["work_week", "day"]}
            view={activeView}
            style={style}
            min={minTime}
            max={maxTime}
            localizer={locale}
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

