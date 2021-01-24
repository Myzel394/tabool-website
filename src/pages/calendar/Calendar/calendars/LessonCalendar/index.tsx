import React, {useContext} from "react";

import DefaultCalendar from "../DefaultCalendar";
import CalendarContext from "../../../CalendarContext";

import Event from "./Event";
import {buildCalendarEvents} from "./utils";

const LessonCalendar = () => {
    const {
        lessons,
        events,
        exams,
        showFreePeriods,
        showDetails,
        homeworks,
        materials,
        modifications,
    } = useContext(CalendarContext);

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
                materials,
                homeworks,
                modifications,
            })}
        />
    );
};

export default LessonCalendar;
