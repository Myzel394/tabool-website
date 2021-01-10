import React, {memo} from "react";
import {LessonDetail} from "types";
import {Badges, HomeworkBadge, Lesson, LessonContent, MaterialBadge} from "components";
import {generatePath} from "react-router-dom";
import {Link} from "@material-ui/core";

import createShadow from "../createShadow";


export interface ILessonEvent {
    lesson: LessonDetail;
}

const SingleLesson = ({lesson}: ILessonEvent) => {
    const hasHomework = Boolean(lesson.homeworks.length);
    const hasMaterials = Boolean(lesson.materials.length);
    const badges = [
        hasHomework && <HomeworkBadge count={lesson.homeworks.length} />,
        hasMaterials && <MaterialBadge count={lesson.materials.length} />,
    ].filter(Boolean) as JSX.Element[];

    return (
        <Link
            href={generatePath("/agenda/lesson/detail/:id/", {
                id: lesson.id,
            })}
            underline="none"
        >
            <Lesson
                color={lesson.lessonData.course.subject.userRelation.color}
                startTime={lesson.lessonData.startTime}
                endTime={lesson.lessonData.endTime}
            >
                <Badges badges={badges} />
                <LessonContent
                    showDetails
                    courseName={lesson.lessonData.course.name}
                    roomName={lesson.lessonData.room.place}
                    teacherName={lesson.lessonData.course.teacher.lastName}
                    style={{
                        boxShadow: createShadow(lesson.lessonData.course.subject.userRelation.color),
                    }}
                />
            </Lesson>
        </Link>
    );
};

export default memo(SingleLesson);
