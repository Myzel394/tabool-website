import React, {memo} from "react";
import {Homework} from "components";
import {Event as CalendarEvent} from "react-big-calendar";
import {HomeworkDetail} from "types";

export interface IEvent {
    event: CalendarEvent;
    style?: any;
}

const Event = ({event, style}: IEvent) => {
    const homework: HomeworkDetail = event.resource;

    return (
        <div style={style}>
            <Homework
                subject={homework.lesson.lessonData.course.subject}
                information={homework.information}
                creationDate={homework.createdAt}
                dueDate={homework.dueDate}
                completed={homework.userRelation.completed}
                ignore={homework.userRelation.ignore}
            />
        </div>
    );
};

export default memo(Event);
