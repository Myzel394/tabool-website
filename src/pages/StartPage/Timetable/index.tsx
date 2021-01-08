import React from "react";
import {Calendar, Event as CalendarEvent} from "react-big-calendar";
import {locale} from "utils";

import LessonEvent from "./LessonEvent";

export interface ICalendar {
    lessons: CalendarEvent[];
}

const style = {
    height: 500,
};

const Timetable = ({
    lessons,
}: ICalendar) => {
    return (
        <Calendar
            events={lessons}
            localizer={locale}
            startAccessor="start"
            endAccessor="end"
            style={style}
            components={{
                eventWrapper: LessonEvent,
                resourceHeader() {
                    return null;
                },
            }}
        />
    );
};

export default Timetable;
