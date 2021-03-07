import React, {useCallback, useContext, useMemo} from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {Calendar, Event as CalendarEvent} from "react-big-calendar";
import {combineDatetime, findNextDate, getEndTime, getLessonMinMaxTime, getStartTime, locale} from "utils";
import {CircularProgress, withStyles} from "@material-ui/core";
import {useAsync, useWindowSize} from "hooks";
import {StudentLessonDetail} from "types";
import dayjs from "dayjs";
import calendarStyles from "components/calendarStyles";

import LessonFieldContext from "./LessonFieldContext";
import LessonEvent from "./LessonEvent";
import Toolbar from "./Toolbar";

const convertLessonsToEvents = async (lessons: StudentLessonDetail[], date: Date): Promise<CalendarEvent[]> => {
    const dayjsDate = dayjs(date);
    const parse = async (lesson: StudentLessonDetail): Promise<CalendarEvent> => ({
        resource: lesson,
        start: findNextDate(combineDatetime(dayjsDate, dayjs(getStartTime(lesson.startHour))), lesson.weekday).toDate(),
        end: findNextDate(combineDatetime(dayjsDate, dayjs(getEndTime(lesson.endHour))), lesson.weekday).toDate(),
    });

    const value = await Promise.allSettled(lessons.map(parse));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return value.map(promise => promise.value);
};


const Timetable = ({classes}) => {
    const {
        lessons,
        activeDate,
        onActiveDateChange,
    } = useContext(LessonFieldContext);

    const [, height] = useWindowSize();
    const style = useMemo(() => ({
        width: "100%",
        height: Math.min(800, Math.max(500, height)),
    }), [height]);
    const getEvents = useCallback(async () => {
        if (lessons) {
            return convertLessonsToEvents(lessons, activeDate);
        }
        return [];
    }, [lessons, activeDate]);
    const {value: events} = useAsync(getEvents);

    if (!lessons || !events) {
        return (
            <CircularProgress />
        );
    }

    const components = {
        toolbar: Toolbar,
        eventWrapper: LessonEvent,
    };
    const [minTime, maxTime] = getLessonMinMaxTime(lessons);

    return (
        <Calendar
            className={classes.root}
            events={events}
            views={["work_week"]}
            view="work_week"
            step={30}
            date={activeDate}
            localizer={locale}
            components={components}
            min={minTime}
            max={maxTime}
            style={style}
            onNavigate={date => onActiveDateChange(date)}
        />
    );
};
export default withStyles(calendarStyles)(Timetable);


