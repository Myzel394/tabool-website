import React, {useContext} from "react";

import DefaultCalendar from "../DefaultCalendar";
import CalendarContext from "../../../CalendarContext";

import {buildCalendarEvents} from "./utils";
import Event from "./Event";

const LessonCalendar = () => {
    const {lessons, events, showFreePeriods, showDetails} = useContext(CalendarContext);

    const calendarEvents = buildCalendarEvents({
        events,
        lessons,
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
