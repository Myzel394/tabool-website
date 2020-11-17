import React from "react";
import {EventDetail, HomeworkApprox, LessonDetail, MaterialApprox, ModificationDetail} from "types";

import DefaultCalendar, {IDefaultCalendarManager} from "../DefaultCalendar";

import Event from "./Event";
import {buildCalendarEvents} from "./utils";


export interface ILessonCalendar extends IDefaultCalendarManager {
    lessons: LessonDetail[];
    modifications: ModificationDetail[];
    events: EventDetail[];
    homeworks: HomeworkApprox[];
    materials: MaterialApprox[];
}

const LessonCalendar = ({
    lessons,
    modifications,
    events,
    homeworks,
    materials,
    activeView,
    onCalendarTypeChange,
    onViewChange,
    activeType,
    activeDate,
    onDateChange,
    hasOnceAnimated,

}: ILessonCalendar) => {
    const calendarEvents = buildCalendarEvents({
        events,
        lessons,
    });

    return (
        <DefaultCalendar
            events={calendarEvents}
            eventComponent={Event({
                homeworks,
                materials,
                modifications,
                activeType,
                animate: !hasOnceAnimated
            },
            )}
            calendarType={activeType}
            date={activeDate}
            view={activeView}
            onViewChange={onViewChange}
            onCalendarTypeChange={onCalendarTypeChange}
            onDateChange={onDateChange}
        />
    );
};

export default LessonCalendar;
