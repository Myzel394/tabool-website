import React, {CSSProperties, useContext} from "react";
import {Event as CalendarEvent} from "react-big-calendar";
import {getEventWrapperStyles} from "utils";
import {useTheme} from "@material-ui/core";
import {useDeviceWidth} from "hooks";
import {SingleLesson} from "components";

import {DayLessonResource} from "../getEvents";
import TimetableContext from "../TimetableContext";

import getModificationClass from "./getModificationClass";


export interface IWeekEvent {
    event: CalendarEvent;
    style?: CSSProperties;
}

const WeekEvent = ({
    event,
    style,
}: IWeekEvent) => {
    const {
        date,
    } = useContext(TimetableContext);
    const theme = useTheme();
    const {isMD} = useDeviceWidth();

    const eventStyles = getEventWrapperStyles(style ?? {}, event);
    const resource: DayLessonResource = event.resource;
    const {
        materialCount,
        homeworkCount,
        hasExam,
        modifications,
        ...lesson
    } = resource;

    if (isMD) {
        return (
            <div
                style={eventStyles}
                className={getModificationClass(modifications)}
            >
                <SingleLesson
                    showDetails
                    lesson={lesson}
                    materialCount={materialCount}
                    homeworkCount={homeworkCount}
                    date={date}
                    hasExam={hasExam}
                />
            </div>
        );
    } else {
        return (
            <div
                style={{
                    ...eventStyles,
                    borderRadius: theme.shape.borderRadius,
                    padding: theme.spacing(1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    wordBreak: "break-all",
                    backgroundColor: lesson.course.subject.userRelation.color,
                }}
            >
                {lesson.course.name}
            </div>
        );
    }
};
export default WeekEvent;


