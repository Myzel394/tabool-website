import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import React from "react";

import Day from "./Day";

type RenderFunction = (day: MaterialUiPickersDate, selectedDate: MaterialUiPickersDate, dayInCurrentMonth: boolean, dayComponent: JSX.Element) => JSX.Element;

const renderDayWithLessonWeekdays = (
    weekdays: number[],
    lessonColor: string,
    customCheck: (day: MaterialUiPickersDate, selectedDate: MaterialUiPickersDate, dayInCurrentMonth: boolean, dayComponent: JSX.Element) => boolean = () => true,
): RenderFunction =>
    (day, selectedDate, x, dayComponent) => {
        if (
            // Lesson
            day && weekdays.includes(day.day() - 1) &&
            customCheck(day, selectedDate, x, dayComponent)
        ) {
            return <Day color={lessonColor} dayComponent={dayComponent} />;
        }

        return dayComponent;
    };

export default renderDayWithLessonWeekdays;
