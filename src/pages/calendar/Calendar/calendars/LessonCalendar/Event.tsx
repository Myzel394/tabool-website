import React, {ReactNode} from "react";
import {EventDetail, ExamDetail, LessonDetail, ModificationDetail} from "types";
import {Event as CalendarEvent} from "react-big-calendar";
import {ThemeProvider} from "@material-ui/core";
import {createSmallTheme, getEventWrapperStyles} from "utils";

import EventEvent from "./EventEvent";
import ModificationEvent from "./ModificationEvent";
import LessonEvent from "./LessonEvent";
import ExamEvent from "./ExamEvent";


interface IEvent {
    event: CalendarEvent;
    style: any;
    showFreePeriods: boolean;
    showDetails: boolean;
}

const Event = ({
    event: calendarEvent,
    style,
    showFreePeriods,
    showDetails,
}: IEvent) => {
    const divStyle = {
        ...getEventWrapperStyles(style ?? {}, calendarEvent),
        wordBreak: "break-all" as "break-all",
    };

    let children: ReactNode = null;

    switch (calendarEvent.resource.type) {
        case "lesson": {
            const lesson: LessonDetail = calendarEvent.resource;
            const homeworkCount = lesson.homeworks.length;
            const materialCount = lesson.materials.length;
            const modification = lesson.modifications[0];

            children = (
                <LessonEvent
                    lesson={lesson}
                    materialCount={materialCount}
                    homeworkCount={homeworkCount}
                    modification={modification}
                    showWhenFreePeriod={showFreePeriods}
                    showDetails={showDetails}
                />
            );
            break;
        }
        case "event": {
            const event: EventDetail = calendarEvent.resource;

            children = (
                <EventEvent event={event} />
            );
            break;
        }
        case "modification": {
            const modification: ModificationDetail = calendarEvent.resource;

            children = (
                <ModificationEvent modification={modification} />
            );
            break;
        }
        case "exam": {
            const exam: ExamDetail = calendarEvent.resource;

            return (
                <ExamEvent event={exam} />
            );
        }
    }

    return (
        <ThemeProvider theme={createSmallTheme}>
            <div style={divStyle}>
                {children}
            </div>
        </ThemeProvider>
    );
};

const eventProxy = ({
    showFreePeriods,
    showDetails,
}: {
    showFreePeriods: IEvent["showFreePeriods"];
    showDetails: IEvent["showDetails"];
}) => props =>
    Event({
        ...props,
        showFreePeriods,
        showDetails,
    });


export default eventProxy;
