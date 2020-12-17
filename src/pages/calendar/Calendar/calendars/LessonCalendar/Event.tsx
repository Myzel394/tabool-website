import React, {ReactNode} from "react";
import {EventDetail, LessonDetail, ModificationDetail} from "types";
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
    showFreePeriods: boolean;
    showDetails: boolean;
}

const createTheme = (parentTheme: Theme) => update(parentTheme, {
    typography: {
        body1: {
            fontSize: {
                $set: ".5rem",
            },
            [parentTheme.breakpoints.up("lg")]: {
                $set: {
                    fontSize: ".8rem",
                },
            },
        },
        body2: {
            fontSize: {
                $set: ".4rem",
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
                    fontSize: ".7rem",
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
    showFreePeriods,
    showDetails,
}: IEvent) => {
    const divStyle = {
        ...getDivStyles(style ?? {}, calendarEvent),
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
