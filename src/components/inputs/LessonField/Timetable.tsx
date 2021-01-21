import React, {useMemo} from "react";
import dayjs, {Dayjs} from "dayjs";
import {Calendar, Event as CalendarEvent} from "react-big-calendar";
import {combineDatetime, createSmallTheme, getMinMaxTime, locale} from "utils";
import {ThemeProvider, useTheme, withStyles} from "@material-ui/core";
import {useWindowSize} from "hooks";
import {Timetable as TimetableType} from "types";
import "react-big-calendar/lib/css/react-big-calendar.css";
import calendarStyles from "components/calendarStyles";

import LessonEvent from "./LessonEvent";
import Toolbar from "./Toolbar";

export interface ITimetable {
    timetable: TimetableType;
    onDateChange: (newDate: Dayjs) => any;
    activeDate: Dayjs;
    selectedLesson: string | null;
    onLessonSelect: (lessonId: string) => any;

    classes?: any;
    minDate?: Dayjs;
    maxDate?: Dayjs;
    minTime?: Dayjs;
    maxTime?: Dayjs;
    allowedCourses?: string[];
    allowedLessons?: string[];
    allowedWeekdays?: number[];
}


const Timetable = ({
    activeDate,
    onDateChange,
    timetable,
    maxDate,
    minDate,
    selectedLesson,
    onLessonSelect,
    allowedLessons,
    allowedCourses,
    allowedWeekdays,
    classes,
    maxTime: allowedMaxTime,
    minTime: allowedMinTime,
}: ITimetable) => {
    const parentTheme = useTheme();
    const [, height] = useWindowSize();
    const timetableMinDate = (() => {
        if (!minDate) {
            return timetable.earliestDateAvailable;
        }

        return dayjs.unix(
            Math.max(
                minDate.unix(),
                timetable.earliestDateAvailable.unix(),
            ),
        );
    })();
    const timetableMaxDate = (() => {
        if (!maxDate) {
            return timetable.latestDateAvailable;
        }

        return dayjs.unix(
            Math.min(
                maxDate.unix(),
                timetable.latestDateAvailable.unix(),
            ),
        );
    })();
    const lessons: CalendarEvent[] = timetable.lessons.map(lesson => ({
        allDay: false,
        title: lesson.lessonData.course.name,
        start: combineDatetime(lesson.date, lesson.lessonData.startTime).toDate(),
        end: combineDatetime(lesson.date, lesson.lessonData.endTime).toDate(),
        resource: {
            ...lesson,
            type: "lesson",
        },
    }));
    const components = {
        toolbar: Toolbar({
            minDate: timetableMinDate,
            maxDate: timetableMaxDate,
            onDateChange,
            parentTheme,
        }),
        eventWrapper: LessonEvent({
            selectedLesson,
            allowedCourses,
            allowedLessons,
            allowedWeekdays,
            minTime: allowedMinTime,
            maxTime: allowedMaxTime,
            onSelect: onLessonSelect,
        }),
    };
    const [minTime, maxTime] = getMinMaxTime(lessons);

    const style = useMemo(() => ({
        width: "100%",
        height: Math.min(800, Math.max(500, height)),
    }), [height]);

    return (
        <ThemeProvider theme={createSmallTheme}>
            <Calendar
                className={classes.root}
                events={lessons}
                views={["work_week"]}
                view="work_week"
                step={30}
                date={activeDate.toDate()}
                localizer={locale}
                components={components}
                min={minTime}
                max={maxTime}
                style={style}
                onNavigate={date => onDateChange(dayjs(date))}
            />
        </ThemeProvider>
    );
};

export default withStyles(calendarStyles)(Timetable);
