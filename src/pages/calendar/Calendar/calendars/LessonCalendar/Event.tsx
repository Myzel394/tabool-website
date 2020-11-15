import React from "react";
import {EventDetail, HomeworkApprox, LessonDetail, MaterialApprox} from "types";
import {Event as CalendarEvent} from "react-big-calendar";

import {CalendarType} from "../DefaultCalendar/Toolbar";
import getDivStyles from "../utils";

import LessonEvent from "./LessonEvent";
import EventEvent from "./EventEvent";

interface IEvent {
    event: CalendarEvent;
    style: any;
    homeworks: HomeworkApprox[];
    materials: MaterialApprox[];
    animate: boolean;
    activeType: CalendarType;
}

const Event = ({
    event: calendarEvent,
    style,
    homeworks,
    materials,
    animate,
    activeType,
}: IEvent) => {
    const divStyle = getDivStyles(style ?? {});

    let children: JSX.Element = <></>;

    switch (calendarEvent.resource.type) {
    case "lesson": {
        const lesson: LessonDetail = calendarEvent.resource;
        const homeworkCount = homeworks.filter(element => element.lesson === lesson.id).length;
        const materialCount = materials.filter(element => element.lesson === lesson.id).length;

        children = (
            <LessonEvent
                lesson={lesson}
                materialCount={materialCount}
                homeworkCount={homeworkCount}
            />
        );
        break;
    }
    case "event": {
        const event: EventDetail = calendarEvent.resource;

        children = (
            <EventEvent event={event} />
        );
    }
    }

    return (
        <div style={divStyle}>
            {children}
        </div>
    );
};

const eventProxy = (
    homeworks: HomeworkApprox[],
    materials: MaterialApprox[],
    animate = true,
    activeType: CalendarType,
) => props =>
    Event({
        ...props,
        homeworks,
        materials,
        animate,
        activeType,
    });

export default eventProxy;
