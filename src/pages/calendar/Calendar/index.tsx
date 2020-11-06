import React, {useMemo, useState} from "react";
import {Calendar as BigCalendar, Event as CalendarEvent, momentLocalizer, View} from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

import {EventDetail, LessonDetail, ModificationDetail} from "types";
import dayjs, {Dayjs} from "dayjs";
import {useWindowSize} from "hooks";
import {combineDatetime} from "utils";

import Toolbar from "./Toolbar";
import Event from "./Event";

export interface ICalendar {
    lessons?: LessonDetail[];
    modifications?: ModificationDetail[];
    events?: EventDetail[];
    date: Dayjs;
}

const Calendar = ({lessons, modifications, events, date}: ICalendar) => {
    const [activeView, setActiveView] = useState<View>("work_week");
    const [width, height] = useWindowSize();
    const calendarEvents: CalendarEvent[] = useMemo(() => [
        ...(lessons ?? []).map((lesson): CalendarEvent => ({
            title: lesson.lessonData.course.name,
            allDay: false,
            start: combineDatetime(lesson.date, lesson.lessonData.startTime).toDate(),
            end: combineDatetime(lesson.date, lesson.lessonData.endTime).toDate(),
            resource: lesson,
        })),
    ], [lessons]);
    const calendarHeight = Math.min(1200, Math.max(500, height ?? 0));
    const style = useMemo(() => ({
        height: calendarHeight,
    }), [calendarHeight]);
    const [minTime, maxTime] = useMemo(() => {
        const times = calendarEvents.map(element => dayjs(element.start).unix());
        const minUnix = Math.min(...times);
        const maxUnix = Math.max(...times);

        return [dayjs.unix(minUnix), dayjs.unix(maxUnix)];
    }, [calendarEvents]);

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
                toolbar: Toolbar({
                    onViewChange: newView => setActiveView(newView),
                }),
                eventWrapper: Event,
            }}
            dayLayoutAlgorithm="no-overlap"
            min={minTime.toDate()}
            max={maxTime.toDate()}
        />
    );
};

export default Calendar;
