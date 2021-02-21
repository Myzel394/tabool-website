import React, {memo} from "react";
import {StudentHomeworkDetail, StudentLessonDetail, StudentMaterialDetail} from "types";
import {Badges, HomeworkBadge, Lesson, LessonContent, MaterialBadge} from "components";
import {Link} from "@material-ui/core";
import {buildPath, findNextDate, getEndTime, getStartTime, lazyDatetime} from "utils";
import dayjs from "dayjs";

import createShadow from "../createShadow";


export interface ILessonEvent {
    lesson: StudentLessonDetail;
    homeworks: StudentHomeworkDetail[];
    materials: StudentMaterialDetail[];
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
            href={buildPath("/agenda/lesson/detail/:id/:date/", {
                id: lesson.id,
                date: lazyDatetime(findNextDate(dayjs(), lesson.weekday), "date") ?? "",
            })}
            underline="none"
        >
            <Lesson
                color={lesson.course.subject.userRelation.color}
                startTime={dayjs(getStartTime(lesson.startHour))}
                endTime={dayjs(getEndTime(lesson.endHour))}
            >
                <Badges badges={badges} />
                <LessonContent
                    showDetails
                    courseName={lesson.course.name}
                    roomName={lesson.course.room.place}
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
