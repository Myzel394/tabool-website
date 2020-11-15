import React, {memo} from "react";
import {Badges, HomeworkBadge, Lesson, LessonContent, MaterialBadge} from "components/timetable/Lesson";
import {LessonDetail} from "types";

export interface ILessonEvent {
    homeworkCount: number;
    materialCount: number;
    lesson: LessonDetail;
}

const LessonEvent = ({homeworkCount, materialCount, lesson}: ILessonEvent) => {
    return (
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
    );
};

export default memo(LessonEvent);
