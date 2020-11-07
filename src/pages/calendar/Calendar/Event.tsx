import React, {useMemo} from "react";
import {Lesson, LessonContent} from "components/timetable/Lesson";
import {LessonDetail} from "types";

const stringifyPercent = (value: string | number): string => (typeof value === "string" ? value : `${value}%`);

const Event = (props) => {
    const {
        event,
        style,
    } = props;
    const {height, top, width, xOffset} = style;
    const divStyle = useMemo(() => ({
        top: stringifyPercent(top),
        left: stringifyPercent(xOffset),
        width: stringifyPercent(width),
        height: stringifyPercent(height),
        position: "absolute" as "absolute",
    }), [height, top, width, xOffset]);
    const lesson: LessonDetail = event.resource;

    return (
        <div style={divStyle}>
            <Lesson
                isSmall
                color={lesson.lessonData.course.subject.userRelation.color}
                startTime={lesson.lessonData.startTime}
                endTime={lesson.lessonData.endTime}
            >
                <LessonContent
                    courseName={lesson.lessonData.course.name}
                    roomName={lesson.lessonData.room.place}
                    teacherName={lesson.lessonData.course.teacher.lastName}
                />
            </Lesson>
        </div>
    );
};

export default Event;
