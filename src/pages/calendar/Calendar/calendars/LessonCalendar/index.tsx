import React, {useContext} from "react";

import DefaultCalendar from "../DefaultCalendar";
import CalendarContext from "../../../CalendarContext";

import {buildCalendarEvents} from "./utils";
import Event from "./Event";

const LessonCalendar = () => {
    const {lessons, modifications, events, homeworks, materials, showFreePeriods, animate, showDetails} = useContext(CalendarContext);

    const calendarEvents = buildCalendarEvents({
        events,
        lessons,
        modifications,
    });
    const usedModificationsIds = calendarEvents
        .filter(element => element.resource.type === "modification")
        .map(element => element.resource.id);
    const availableModifications = modifications.filter(element =>
        !usedModificationsIds.includes(element.id));

    return (
        <DefaultCalendar
            events={calendarEvents}
            eventComponent={Event({
                modifications: availableModifications,
                homeworks,
                materials,
                showFreePeriods,
                animate,
                showDetails,
            })}
        />
    );
};

export default LessonCalendar;
