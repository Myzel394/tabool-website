import React, {useContext} from "react";

import DefaultCalendar from "../DefaultCalendar";
import CalendarContext from "../../../CalendarContext";

import Event from "./Event";
import {buildCalendarEvents} from "./utils";

const LessonCalendar = () => {
    const {lessons, events, exams, showFreePeriods, showDetails} = useContext(CalendarContext);

    const calendarEvents = buildCalendarEvents({
        events,
        lessons,
        exams,
    });

    return (
        <DefaultCalendar
            events={calendarEvents}
            eventComponent={Event({
                showFreePeriods,
                showDetails,
            })}
        />
    );
};

export default LessonCalendar;
