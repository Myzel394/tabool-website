import React, {useState} from "react";
import {Homework} from "components";
import {Event as CalendarEvent} from "react-big-calendar";
import {HomeworkDetail} from "types";
import update from "immutability-helper";

import {ICalendarContext} from "../../../CalendarContext";

export interface IEvent {
    event: CalendarEvent;
    refetch: ICalendarContext["refetch"];
    style?: any;
}

const Event = ({event, style, refetch}: IEvent) => {
    const [data, setData] = useState<HomeworkDetail>(event.resource);

    return (
        <div style={style}>
            <Homework
                subject={data.lesson.lessonData.course.subject}
                information={data.information}
                creationDate={data.createdAt}
                dueDate={data.dueDate}
                completed={data.userRelation.completed}
                ignore={data.userRelation.ignore}
                id={data.id}
                onServerUpdate={homeworkRelationData => {
                    setData(prevState => update(prevState, {
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
