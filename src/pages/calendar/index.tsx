import React, {useState} from "react";
import {View} from "react-big-calendar";
import {isMobile} from "react-device-detect";

import {CalendarType} from "./Calendar/Toolbar";
import {LessonCalendar} from "./Calendar";

const Calendar = () => {
    const [activeView, setActiveView] = useState<View>(isMobile ? "day" : "work_week");
    const [activeType, setActiveType] = useState<CalendarType>("lesson");

    switch (activeType) {
    case "lesson":
        return (
            <LessonCalendar
                activeView={activeView}
                onCalendarTypeChange={setActiveType}
                onViewChange={setActiveView}
            />
        );
    }

    return null;
};

export default Calendar;
