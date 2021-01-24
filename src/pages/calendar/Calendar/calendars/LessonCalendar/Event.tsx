import React, {ReactNode} from "react";
import {EventDetail, ExamDetail, HomeworkDetail, LessonRelatedDetail, MaterialDetail, ModificationDetail} from "types";
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
    modifications: ModificationDetail[];
    homeworks: HomeworkDetail[];
    materials: MaterialDetail[];
}

const Event = ({
    event: calendarEvent,
    style,
    showFreePeriods,
    showDetails,
    homeworks,
    materials,
    modifications,
}: IEvent) => {
    const divStyle = {
        ...getEventWrapperStyles(style ?? {}, calendarEvent),
        wordBreak: "break-all" as "break-all",
    };

    let children: ReactNode = null;

    switch (calendarEvent.resource.type) {
        case "lesson": {
            const lesson: LessonRelatedDetail = calendarEvent.resource;
            const homeworkCount = homeworks.filter(homework => homework.lesson.id === lesson.id).length;
            const materialCount = materials.filter(material => material.lesson.id === lesson.id).length;
            const modification = modifications.filter(modification => modification.lesson.id === lesson.id)[0];

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
    modifications,
    homeworks,
    materials,
}: {
    showFreePeriods: IEvent["showFreePeriods"];
    showDetails: IEvent["showDetails"];
    modifications: IEvent["modifications"];
    homeworks: IEvent["homeworks"];
    materials: IEvent["materials"];
}) => props =>
    Event({
        ...props,
        showFreePeriods,
        showDetails,
        modifications,
        homeworks,
        materials,
    });


export default eventProxy;
