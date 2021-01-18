import React, {ComponentType, useContext, useMemo} from "react";
import {useWindowSize} from "hooks";
import {Calendar as BigCalendar, CalendarProps, Event as CalendarEvent, EventWrapperProps} from "react-big-calendar";
import dayjs from "dayjs";
import {findNextDate, getMinMaxTime, locale} from "utils";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {Theme, withStyles} from "@material-ui/core";
import tinycolor from "tinycolor2";

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
    classes: any;
}

const DefaultCalendar = ({
    style: givenStyles = {},
    events,
    eventComponent,
    classes,
    ...other
}: IDefaultCalendar) => {
    const {date, activeView, onDateChange} = useContext(CalendarContext);
    const [, height] = useWindowSize();

    const style = useMemo(() => ({
        ...givenStyles,
        height: Math.min(2500, Math.max(800, height)),
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
            className={classes.root}
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

const styles = (theme: Theme) => {
    const color = tinycolor(theme.palette.text.primary).setAlpha(0.1).toString();

    return {
        root: {
            "& .rbc-timeslot-group": {
                borderColor: color,
            },
            "& .rbc-time-content": {
                borderColor: color,
            },
            "& .rbc-time-view": {
                borderColor: color,
            },
            "& .rbc-events-container": {
                borderColor: color,
            },
            "& .rbc-time-header-content": {
                borderColor: color,
            },
            "& .rbc-time-slot": {
                border: "none !important",
            },
            "& .rbc-today": {
                backgroundColor: theme.palette.background.default,
            },
        },
    };
};

export default withStyles(styles)(DefaultCalendar);
