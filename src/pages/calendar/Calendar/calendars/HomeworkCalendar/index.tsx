import React, {memo, useContext} from "react";
import {HomeworkDetail} from "types";

import CalendarContext from "../../../CalendarContext";
import DefaultCalendar from "../DefaultCalendar";

import {buildCalendarEvents} from "./utils";
import Event from "./Event";

const HomeworkCalendar = () => {
    const {lessons, refetch} = useContext(CalendarContext);

    const homeworks = lessons.reduce<HomeworkDetail[]>((object, lesson) => [
        ...object,
        ...lesson.homeworks,
    ], []);

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
