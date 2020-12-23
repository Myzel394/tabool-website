import React, {useMemo} from "react";
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
}: ILessonEvent): JSX.Element => {
    const theme = useTheme();
    const lesson: LessonDetail = event.resource;
    const isSelected = selectedLesson === lesson.id;
    const backgroundColor = lesson.lessonData.course.subject.userRelation.color;
    const wrapperStyle = useMemo(() => ({
        ...getEventWrapperStyles(style ?? {}, event),
        wordBreak: "break-all" as "break-all",
        backgroundColor,
        borderRadius: theme.shape.borderRadius,
        opacity: isSelected ? 1 : theme.palette.action.disabledOpacity,
    }), [theme.shape.borderRadius, style, event, isSelected, backgroundColor, theme.palette.action.disabledOpacity]);
    const courseName = lesson.lessonData.course.name;

    return (
        <ButtonBase
            style={wrapperStyle}
            defaultChecked={isSelected}
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
