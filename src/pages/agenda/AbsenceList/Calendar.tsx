import React from "react";
import {Absence} from "types";
import {Calendar as BigCalendar, Event as CalendarEvent} from "react-big-calendar";
import {locale} from "utils";
import {withStyles} from "@material-ui/core";
import {calendarStyles} from "components";
import dayjs, {Dayjs} from "dayjs";

import Event from "./Event";
import Toolbar from "./Toolbar";

export interface ICalendar {
    absences: Absence[];
    classes: any;
    date: Dayjs;
    onDateChange: (date: Dayjs) => any;
}

const Calendar = ({
    absences,
    classes,
    date,
    onDateChange,
}: ICalendar) => {
    const events = absences.map((absence): CalendarEvent => ({
        allDay: true,
        start: absence.lesson.date.toDate(),
        end: absence.lesson.date.toDate(),
        title: absence.id,
        resource: absence,
    }));

    return (
        <BigCalendar
            popup
            events={events}
            view="month"
            views={["month"]}
            localizer={locale}
            style={{
                height: 400,
            }}
            date={date.toDate()}
            className={classes.root}
            components={{
                eventWrapper: Event,
                toolbar: Toolbar,
            }}
            onNavigate={newDate => onDateChange(dayjs(newDate))}
        />
    );
};

export default withStyles(calendarStyles)(Calendar);
