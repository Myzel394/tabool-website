import React, {useCallback} from "react";
import {EventDetail, HomeworkApprox, LessonDetail, MaterialApprox, ModificationDetail} from "types";
import {Event as CalendarEvent} from "react-big-calendar";
import {Theme, ThemeProvider} from "@material-ui/core";
import update from "immutability-helper";

import {CalendarType} from "../DefaultCalendar/Toolbar";
import getDivStyles from "../utils";

import EventEvent from "./EventEvent";
import LessonEvent from "./LessonEvent";
import ModificationEvent from "./ModificationEvent";


interface IEvent {
    event: CalendarEvent;
    style: any;
    homeworks: HomeworkApprox[];
    materials: MaterialApprox[];
    modifications: ModificationDetail[];
    animate: boolean;
    activeType: CalendarType;
    showFreePeriods: boolean;
}

const Event = ({
    event: calendarEvent,
    style,
    homeworks,
    materials,
    modifications,
    showFreePeriods,
    animate,
    activeType,
}: IEvent) => {
    const divStyle = getDivStyles(style ?? {});

    const createTheme = useCallback((parentTheme: Theme) => update(parentTheme, {
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
    }), []);

    let children: JSX.Element = <></>;

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
    homeworks,
    activeType,
    animate = true,
    materials,
    modifications,
    showFreePeriods,
}: {
    homeworks: HomeworkApprox[];
    materials: MaterialApprox[];
    modifications: ModificationDetail[];
    animate: boolean;
    activeType: CalendarType;
    showFreePeriods: boolean;
}) => props =>
    Event({
        ...props,
        homeworks,
        modifications,
        materials,
        animate,
        activeType,
        showFreePeriods,
    });


export default eventProxy;
