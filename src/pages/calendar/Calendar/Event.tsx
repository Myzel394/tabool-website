import React, {memo} from "react";
import {Lesson, LessonContent} from "components/timetable/Lesson";
import {LessonDetail} from "types";

const Event = ({event, style, ...other}: any) => {
    console.log(other);
    const lesson: LessonDetail = event.resource;

    return (
        <div style={style}>
            <Lesson
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

export default memo(Event);
