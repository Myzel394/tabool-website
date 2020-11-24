import React, {memo, useContext} from "react";

import DefaultCalendar from "../DefaultCalendar";
import CalendarContext from "../../../CalendarContext";

import {buildCalendarEvents} from "./utils";
import Event from "./Event";

const HomeworkCalendar = () => {
    const {homeworks} = useContext(CalendarContext);

    const calendarEvents = buildCalendarEvents(homeworks);

    return (
        <DefaultCalendar
            events={calendarEvents}
            eventComponent={Event}
        />
    );
};

export default memo(HomeworkCalendar);
