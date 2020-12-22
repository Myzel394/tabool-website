import React from "react";
import {Event as CalendarEvent} from "react-big-calendar";
import {LessonDetail} from "types";
import {getEventWrapperStyles} from "utils";
import {ButtonBase, Typography, useTheme} from "@material-ui/core";
import {ColoredContainer} from "components";

export interface ILessonEvent {
    event: CalendarEvent;
    selectedLesson: string;
    style: any;
    onSelect: (lessonId: string) => any;
}

const LessonEvent = ({
    event,
    selectedLesson,
    onSelect,
    style,
}: ILessonEvent) => {
    const theme = useTheme();
    const lesson: LessonDetail = event.resource;
    const isSelected = selectedLesson === lesson.id;
    const backgroundColor = lesson.lessonData.course.subject.userRelation.color;
    const wrapperStyle = {
        ...getEventWrapperStyles(style ?? {}, event),
        wordBreak: "break-all" as "break-all",
        backgroundColor,
        ...(isSelected ? {
            border: ".1em solid #000",
        } : {}),
    };
    const courseName = lesson.lessonData.course.name;

    return (
        <ButtonBase style={wrapperStyle} onClick={() => onSelect(lesson.id)}>
            <ColoredContainer
                color={backgroundColor}
                parentTheme={theme}
            >
                <Typography color="textSecondary">
                    {courseName}
                </Typography>
            </ColoredContainer>
        </ButtonBase>
    );
};

const proxy = ({
    ...other
}) => (props) => LessonEvent({
    ...props,
    ...other,
});

export default proxy;
