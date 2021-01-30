import React, {memo} from "react";
import {HomeworkDetail, LessonRelatedDetail, MaterialDetail} from "types";
import {Badges, HomeworkBadge, Lesson, LessonContent, MaterialBadge} from "components";
import {Link} from "@material-ui/core";
import {buildPath} from "utils";

import createShadow from "../createShadow";


export interface ILessonEvent {
    lesson: LessonRelatedDetail;
    homeworks: HomeworkDetail[];
    materials: MaterialDetail[];
}

const SingleLesson = ({lesson, homeworks, materials}: ILessonEvent) => {
    const lessonHomeworks = homeworks.filter(homework => homework.lesson.id === lesson.id);
    const lessonMaterials = materials.filter(material => material.lesson.id === lesson.id);
    const badges = [
        lessonHomeworks.length && <HomeworkBadge count={lessonHomeworks.length} />,
        lessonMaterials.length && <MaterialBadge count={lessonMaterials.length} />,
    ].filter(Boolean) as JSX.Element[];

    return (
        <Link
            href={buildPath("/agenda/lesson/detail/:id/", {
                id: lesson.id,
            })}
            underline="none"
        >
            <Lesson
                color={lesson.course.subject.userRelation.color}
                startTime={lesson.startTime}
                endTime={lesson.endTime}
            >
                <Badges badges={badges} />
                <LessonContent
                    showDetails
                    courseName={lesson.course.name}
                    roomName={lesson.room.place}
                    teacherName={lesson.course.teacher.lastName}
                    style={{
                        boxShadow: createShadow(lesson.course.subject.userRelation.color),
                    }}
                />
            </Lesson>
        </Link>
    );
};

export default memo(SingleLesson);
