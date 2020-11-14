import React, {memo} from "react";
import {EventDetail, LessonDetail, ModificationDetail} from "types";

import DefaultCalendar, {IDefaultCalendarManager} from "../DefaultCalendar";

import Event from "./Event";
import {buildCalendarEvents} from "./utils";


export interface ILessonCalendar extends IDefaultCalendarManager {
    lessons: LessonDetail[];
    modifications: ModificationDetail[];
    events: EventDetail[];
}

const LessonCalendar = ({
    lessons,
    modifications,
    events,
    activeView,
    onCalendarTypeChange,
    onViewChange,
    activeType,
    activeDate,
    onDateChange,

}: ILessonCalendar) => {
    const calendarEvents = buildCalendarEvents({
        events,
        modifications,
        lessons,
    });

    return (
        <DefaultCalendar
            events={calendarEvents}
            eventComponent={Event}
            calendarType={activeType}
            date={activeDate}
            view={activeView}
            onViewChange={onViewChange}
            onCalendarTypeChange={onCalendarTypeChange}
            onDateChange={onDateChange}
        />
    );
};

export default memo(LessonCalendar);
