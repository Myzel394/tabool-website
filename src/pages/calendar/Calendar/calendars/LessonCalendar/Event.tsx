import React, {ReactNode} from "react";
import {EventDetail, HomeworkApprox, LessonDetail, MaterialApprox, ModificationDetail} from "types";
import {Event as CalendarEvent} from "react-big-calendar";
import {Theme, ThemeProvider} from "@material-ui/core";
import update from "immutability-helper";

import getDivStyles from "../utils";

import EventEvent from "./EventEvent";
import ModificationEvent from "./ModificationEvent";
import LessonEvent from "./LessonEvent";


interface IEvent {
    event: CalendarEvent;
    style: any;
    modifications: ModificationDetail[];
    homeworks: HomeworkApprox[];
    materials: MaterialApprox[];
    showFreePeriods: boolean;
    animate: boolean;
    showDetails: boolean;
}

const createTheme = (parentTheme: Theme) => update(parentTheme, {
    typography: {
        body1: {
            fontSize: {
                $set: ".6rem",
            },
            [parentTheme.breakpoints.up("lg")]: {
                $set: {
                    fontSize: ".8rem",
                },
            },
        },
        body2: {
            fontSize: {
                $set: ".5rem",
            },
            [parentTheme.breakpoints.up("lg")]: {
                $set: {
                    fontSize: ".7rem",
                },
            },
        },
        h5: {
            $apply: data => {
                const {fontFamily, fontWeight, letterSpacing, lineHeight} = data;

                return {
                    fontFamily,
                    fontWeight,
                    letterSpacing,
                    lineHeight,
                    fontSize: ".9rem",
                    [parentTheme.breakpoints.up("lg")]: {
                        fontSize: "1.3rem",
                    },
                };
            },
        },
    },
});

const Event = ({
    event: calendarEvent,
    style,
    modifications,
    homeworks,
    materials,
    showFreePeriods,
    animate,
    showDetails,
}: IEvent) => {
    const divStyle = getDivStyles(style ?? {});

    let children: ReactNode = null;

    switch (calendarEvent.resource.type) {
        case "lesson": {
            const lesson: LessonDetail = calendarEvent.resource;
            const homeworkCount = homeworks.filter(element => element.lesson === lesson.id).length;
            const materialCount = materials.filter(element => element.lesson === lesson.id).length;
            const modification = modifications.filter(element => element.lesson.id === lesson.id)[0];


            children = (
                <LessonEvent
                    lesson={lesson}
                    materialCount={materialCount}
                    homeworkCount={homeworkCount}
                    modification={modification}
                    showWhenFreePeriod={showFreePeriods}
                    animate={animate}
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
    }

    return (
        <ThemeProvider theme={createTheme}>
            <div style={divStyle}>
                {children}
            </div>
        </ThemeProvider>
    );
};

const eventProxy = ({
    modifications,
    showFreePeriods,
    materials,
    homeworks,
    animate,
    showDetails,
}: {
    modifications: IEvent["modifications"];
    materials: IEvent["materials"];
    homeworks: IEvent["homeworks"];
    showFreePeriods: IEvent["showFreePeriods"];
    animate: IEvent["animate"];
    showDetails: IEvent["showDetails"];
}) => props =>
    Event({
        ...props,
        modifications,
        materials,
        homeworks,
        showFreePeriods,
        animate,
        showDetails,
    });


export default eventProxy;
