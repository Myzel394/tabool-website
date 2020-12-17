import React, {useContext, useState} from "react";
import {Homework} from "components";
import {Event as CalendarEvent} from "react-big-calendar";
import {HomeworkDetail} from "types";
import update from "immutability-helper";

import {ICalendarContext} from "../../../CalendarContext";
import {ErrorContext} from "../../../../../contexts";

export interface IEvent {
    event: CalendarEvent;
    refetch: ICalendarContext["refetch"];
    style?: any;
}

const Event = ({event, style}: IEvent) => {
    const {dispatch: dispatchError} = useContext(ErrorContext);

    const [homework, setHomework] = useState<HomeworkDetail>(event.resource);

    if (!homework.lesson) {
        dispatchError({
            type: "setError",
            payload: {},
        });
        return null;
    }

    return (
        <div style={style}>
            <Homework
                subject={homework.lesson.lessonData.course.subject}
                information={homework.information}
                creationDate={homework.createdAt}
                dueDate={homework.dueDate}
                completed={homework.userRelation.completed}
                ignore={homework.userRelation.ignore}
                id={homework.id}
                onServerUpdate={homeworkRelationData => {
                    setHomework(prevState => update(prevState, {
                        userRelation: {
                            $set: homeworkRelationData,
                        },
                    }));
                }}
            />
        </div>
    );
};

const eventProxy = extraProps => props => Event({
    ...props,
    ...extraProps,
});

export default eventProxy;
