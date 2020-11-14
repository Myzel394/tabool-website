import React, {useEffect, useState} from "react";
import {HomeworkApprox, LessonDetail, MaterialApprox} from "types";
import {Grow} from "@material-ui/core";
import {Event as CalendarEvent} from "react-big-calendar";

import {CalendarType} from "../DefaultCalendar/Toolbar";
import getDivStyles from "../utils";

import LessonEvent from "./LessonEvent";

interface IEvent {
    event: CalendarEvent;
    style: any;
    homeworks: HomeworkApprox[];
    materials: MaterialApprox[];
    animate: boolean;
    activeType: CalendarType;
}

const Event = ({
    event,
    style,
    homeworks,
    materials,
    animate,
    activeType,
}: IEvent) => {
    const [isGrowIn, setIsGrowIn] = useState<boolean>(!animate);

    const delay = event.resource.delay;
    const divStyle = getDivStyles(style);

    // Grow in
    useEffect(() => {
        const delayTimeout = animate && setTimeout(() => setIsGrowIn(true), delay);

        return () => {
            if (delayTimeout) {
                clearTimeout(delayTimeout);
            }
        };
    }, [animate, delay]);

    const children: JSX.Element = <></>;

    const lesson: LessonDetail = event.resource;

    const homeworkCount = homeworks.filter(element => element.lesson === lesson.id).length;
    const materialCount = materials.filter(element => element.lesson === lesson.id).length;

    if (animate) {
        return (
            <div style={divStyle}>
                <Grow mountOnEnter unmountOnExit in={isGrowIn}>
                    <LessonEvent
                        homeworkCount={homeworkCount}
                        materialCount={materialCount}
                        lesson={lesson}
                    />
                </Grow>
            </div>
        );
    }
    return children;
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
