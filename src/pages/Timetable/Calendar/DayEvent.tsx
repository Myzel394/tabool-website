import React, {CSSProperties, useContext} from "react";
import {Event as CalendarEvent} from "react-big-calendar";
import {SingleLesson} from "components";
import {getEventWrapperStyles} from "utils";

import {DayLessonResource} from "../getEvents";
import TimetableContext from "../TimetableContext";

import getModificationClass from "./getModificationClass";


export interface DayEventProps {
    event: CalendarEvent;
    style?: CSSProperties;
}

const DayEvent = ({
    event,
    style,
}: DayEventProps) => {
    const {
        date,
    } = useContext(TimetableContext);
    const eventStyles = getEventWrapperStyles(style ?? {}, event);
    const resource: DayLessonResource = event.resource;
    const {
        hasExam,
        homeworkCount,
        materialCount,
        modifications,
        ...lesson
    } = resource;

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
                hasExam={hasExam}
                date={date}
            />
        </div>
    );
};

export default DayEvent;
