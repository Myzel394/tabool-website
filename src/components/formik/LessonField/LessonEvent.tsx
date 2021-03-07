import React, {CSSProperties, useContext} from "react";
import {Event as CalendarEvent} from "react-big-calendar";
import {combineDatetime, getEventWrapperStyles, replaceDatetime} from "utils";
import dayjs, {Dayjs} from "dayjs";
import {ButtonBase, makeStyles} from "@material-ui/core";
import {StudentLessonDetail} from "types";

import LessonFieldContext from "./LessonFieldContext";

export interface ILessonEvent {
    event: CalendarEvent;
    style?: CSSProperties;
}

const isDateSelected = (lessonDate: Dayjs, selectedDate: Dayjs) =>
    replaceDatetime(lessonDate, "time").isSame(replaceDatetime(selectedDate, "time"));

const createStyles = (isSelected: boolean, isDisabled: boolean, extra: Record<string, any>) => ({
    ...extra,
    opacity: isDisabled ? 0.3 : 1,
    filter: (() => {
        if (isDisabled) {
            return "grayscale(100%)";
        } else if (isSelected) {
            return "";
        } else {
            return "grayscale(70%)";
        }
    })(),
});

const useClasses = makeStyles(theme => ({
    root: {
        wordBreak: "break-all" as "break-all",
        borderRadius: theme.shape.borderRadius,
    },
}));


const LessonEvent = ({
    event,
    style,
}: ILessonEvent): JSX.Element => {
    const {
        allowedLessons,
        allowedCourses,
        allowedMaxTime,
        allowedMinTime,
        allowedWeekdays,
        selectedLessonId,
        selectedLessonDate,
        onLessonSelect,
    } = useContext(LessonFieldContext);
    const classes = useClasses();

    const {resource, start} = event;
    const lesson: StudentLessonDetail = resource;
    const backgroundColor = lesson.course.subject.userRelation.color;
    const courseName = lesson.course.name;
    const date = dayjs(start);

    const isDisabled = (() => {
        // Course disabled
        if (allowedCourses && !allowedCourses.includes(lesson.course.id)) {
            return true;
        }

        // Weekday disabled
        if (allowedWeekdays && !allowedWeekdays.includes(date.day())) {
            return true;
        }

        // Min time disabled
        if (allowedMinTime) {
            const minTime = combineDatetime(date, allowedMinTime);

            if (date.isBefore(minTime)) {
                return true;
            }
        }

        // Max time disabled
        if (allowedMaxTime) {
            const maxTime = combineDatetime(date, allowedMaxTime);

            if (date.isAfter(maxTime)) {
                return true;
            }
        }

        // Lesson disabled
        // noinspection RedundantIfStatementJS
        if (allowedLessons && !allowedLessons.includes(lesson.id)) {
            return true;
        }

        return false;
    })();
    const isSelected = Boolean(
        !isDisabled &&
        lesson.id === selectedLessonId &&
        selectedLessonDate &&
        isDateSelected(date, selectedLessonDate),
    );
    const styles = createStyles(isSelected, isDisabled, {
        ...getEventWrapperStyles(style ?? {}, event),
        backgroundColor,
    });

    return (
        <ButtonBase
            className={classes.root}
            style={styles}
            disabled={isDisabled}
            defaultChecked={isSelected}
            onClick={() => {
                if (isSelected) {
                    onLessonSelect(null);
                } else {
                    onLessonSelect({
                        date,
                        id: lesson.id,
                    });
                }
            }}
        >
            {courseName}
        </ButtonBase>
    );
};

export default LessonEvent;
