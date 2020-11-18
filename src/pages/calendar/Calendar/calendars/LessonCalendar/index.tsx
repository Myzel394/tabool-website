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
    onShowFreePeriodsChange,
    showFreePeriods,

}: ILessonCalendar) => {
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
                homeworks,
                materials,
                activeType,
                showFreePeriods,
                modifications: availableModifications,
                animate: !hasOnceAnimated,
            })}
            calendarType={activeType}
            date={activeDate}
            view={activeView}
            showFreePeriods={showFreePeriods}
            onShowFreePeriodsChange={onShowFreePeriodsChange}
            onViewChange={onViewChange}
            onCalendarTypeChange={onCalendarTypeChange}
            onDateChange={onDateChange}
        />
    );
};

export default LessonCalendar;
