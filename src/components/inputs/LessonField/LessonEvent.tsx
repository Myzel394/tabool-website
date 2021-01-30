import React, {useMemo} from "react";
import {Event as CalendarEvent} from "react-big-calendar";
import {LessonDetail} from "types";
import {getEventWrapperStyles, replaceDatetime} from "utils";
import {ButtonBase, Typography, useTheme} from "@material-ui/core";
import {ColoredContainer} from "components";
import dayjs, {Dayjs} from "dayjs";

export interface ILessonEvent {
    event: CalendarEvent;
    selectedLesson: string;
    style: any;
    onSelect: (lessonId: string) => any;

    allowedCourses?: string[];
    allowedLessons?: string[];
    allowedWeekdays?: number[];
    minTime?: Dayjs;
    maxTime?: Dayjs;
}

const LessonEvent = ({
    event,
    selectedLesson,
    onSelect,
    style,
    allowedCourses,
    allowedLessons,
    maxTime,
    minTime,
    allowedWeekdays,
}: ILessonEvent): JSX.Element => {
    const theme = useTheme();

    const lesson: LessonDetail = event.resource;
    const isSelected = selectedLesson === lesson.id;
    const backgroundColor = lesson.course.subject.userRelation.color;
    const isDisabled = useMemo(() => {
        const isLessonDisabled = !(allowedCourses?.includes?.(lesson.course.id) ?? true);
        const isCourseDisabled = !(allowedLessons?.includes?.(lesson.id) ?? true);
        const isWeekdayDisabled = !(allowedWeekdays?.includes?.(dayjs(event.start).day()) ?? true);
        const isMinTimeDisabled = minTime
            ? replaceDatetime(dayjs(event.start), "date").isBefore(replaceDatetime(minTime, "date"))
            : false;
        const isMaxTimeDisabled = maxTime
            ? replaceDatetime(dayjs(event.end), "date").isAfter(replaceDatetime(maxTime, "date"))
            : false;

        return isLessonDisabled || isCourseDisabled || isMinTimeDisabled || isMaxTimeDisabled || isWeekdayDisabled;
    }, [
        allowedCourses, allowedLessons, allowedWeekdays, event.end, event.start, lesson.id, lesson.course.id,
        maxTime, minTime,
    ]);

    const wrapperStyle = useMemo(() => ({
        ...getEventWrapperStyles(style ?? {}, event),
        wordBreak: "break-all" as "break-all",
        backgroundColor,
        borderRadius: theme.shape.borderRadius,
        opacity: isDisabled ? 0.3 : 1,
        filter: (() => {
            if (isDisabled) {
                return "grayscale(100%)";
            } else if (isSelected) {
                return "";
            } else {
                return "grayscale(80%)";
            }
        })(),
    }), [theme.shape.borderRadius, style, event, isSelected, backgroundColor, isDisabled]);
    const courseName = lesson.course.name;

    return (
        <ButtonBase
            style={wrapperStyle}
            defaultChecked={isSelected}
            disabled={isDisabled}
            onClick={() => onSelect(lesson.id)}
        >
            <ColoredContainer
                color={backgroundColor}
                parentTheme={theme}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    color="textPrimary"
                >
                    {courseName}
                </Typography>
            </ColoredContainer>
        </ButtonBase>
    );
};

const proxy = ({
    ...other
}: any) => (props: any) => LessonEvent({
    ...props,
    ...other,
});

export default proxy;
