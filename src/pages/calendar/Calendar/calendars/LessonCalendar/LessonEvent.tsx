import React, {memo} from "react";
import {Badges, HomeworkBadge, Lesson, LessonContent, MaterialBadge} from "components/timetable/Lesson";
import {LessonDetail} from "types";

export interface ILessonEvent {
    homeworkCount: number;
    materialCount: number;
    style?: any;
    lesson: LessonDetail;
}

const LessonEvent = ({homeworkCount, materialCount, style, lesson}: ILessonEvent) => {
    return (
        <div
            style={{
                ...style,
                width: "100%",
                height: "100%",
            }}
        >
            <Lesson
                isSmall
                color={lesson.lessonData.course.subject.userRelation.color}
                startTime={lesson.lessonData.startTime}
                endTime={lesson.lessonData.endTime}
            >
                <Badges>
                    {homeworkCount > 0 && <HomeworkBadge count={homeworkCount} />}
                    {materialCount > 0 && <MaterialBadge count={materialCount} />}
                </Badges>
                <LessonContent
                    courseName={lesson.lessonData.course.name}
                    roomName={lesson.lessonData.room.place}
                    teacherName={lesson.lessonData.course.teacher.lastName}
                />
            </Lesson>
        </div>
    );
};

export default memo(LessonEvent);
