import React, {memo, useMemo, useState} from "react";
import {Calendar as BigCalendar, momentLocalizer, View} from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

import Toolbar from "./Toolbar";
import {EventDetail, LessonDetail, ModificationDetail} from "types";
import {Dayjs} from "dayjs";
import {useWindowSize} from "hooks";

export interface ICalendar {
    lessons: LessonDetail[];
    modifications: ModificationDetail[];
    events: EventDetail[];
    date: Dayjs;
}

const Calendar = ({lessons, modifications, events, date}: ICalendar) => {
    const [activeView, setActiveView] = useState<View>("work_week");
    const [width, height] = useWindowSize();
    const calendarEvents: (LessonDetail | ModificationDetail | EventDetail)[] = [
        ...lessons,
        ...modifications,
        ...events
    ];
    const calendarHeight = Math.min(1200, Math.max(500, height ?? 0))
    const style = useMemo(() => ({
        height: calendarHeight
    }), [calendarHeight]);

    return (
        <BigCalendar
            localizer={momentLocalizer(moment)}
            events={calendarEvents}
            step={60}
            view={activeView}
            views={["work_week", "day"]}
            date={date.toDate()}
            style={style}
            components={{
                toolbar: Toolbar,
            }}
            dayLayoutAlgorithm="no-overlap"
        />
    );
};

export default Calendar;
