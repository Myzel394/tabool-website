import React from "react";
import dayjs, {Dayjs} from "dayjs";
import {Calendar as BigCalendar, Event as CalendarEvent} from "react-big-calendar";
import {createSmallTheme, getMinMaxTime, locale} from "utils";
import {ThemeProvider} from "@material-ui/core";

import Toolbar from "./Toolbar";
import LessonEvent from "./LessonEvent";

export interface ITimetable {
    lessons: CalendarEvent[];
    onDateChange: (newDate: Dayjs) => any;
    activeDate: Dayjs;
    minDate: Dayjs;
    maxDate: Dayjs;
    selectedLesson: string;
    onLessonSelect: (lessonId: string) => any;
}


const Timetable = ({
    activeDate,
    onDateChange,
    lessons,
    maxDate,
    minDate,
    selectedLesson,
    onLessonSelect,
}: ITimetable) => {
    const [minTime, maxTime] = getMinMaxTime(lessons);
    const components = {
        toolbar: Toolbar({
            minDate,
            maxDate,
            onDateChange,
        }),
        eventWrapper: LessonEvent({
            selectedLesson,
            onSelect: onLessonSelect,
        }),
    };

    return (
        <ThemeProvider theme={createSmallTheme}>
            <BigCalendar
                events={lessons}
                views={["work_week"]}
                view="work_week"
                step={30}
                date={activeDate.toDate()}
                localizer={locale}
                components={components}
                min={minTime}
                max={maxTime}
                onNavigate={date => onDateChange(dayjs(date))}
            />
        </ThemeProvider>
    );
};

export default Timetable;
