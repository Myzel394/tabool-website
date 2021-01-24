import React, {memo, useContext} from "react";

import CalendarContext from "../../../CalendarContext";
import DefaultCalendar from "../DefaultCalendar";

import {buildCalendarEvents} from "./utils";
import Event from "./Event";

const HomeworkCalendar = () => {
    const {refetch, homeworks} = useContext(CalendarContext);

    const calendarEvents = buildCalendarEvents(homeworks);

    return (
        <DefaultCalendar
            events={calendarEvents}
            eventComponent={Event({
                refetch,
            })}
        />
    );
};

export default memo(HomeworkCalendar);
