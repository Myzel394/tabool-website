import React from "react";
import {Badges, HomeworkBadge, Lesson, LessonContent, MaterialBadge, RoomChangeBadge} from "components";
import {LessonDetail, ModificationDetail, ModificationType} from "types";
import clsx from "clsx";

import styles from "./LessonEvent.module.scss";

export interface ILessonEvent {
    homeworkCount: number;
    materialCount: number;
    lesson: LessonDetail;
    modification?: ModificationDetail;
}

const LessonEvent = ({homeworkCount, materialCount, lesson, modification}: ILessonEvent) => {
    return (
        <div
            className={clsx(styles.transition, {
                [styles.isModificationAvailable]: modification !== undefined,
            })}
        >
            <Lesson
                isSmall
                isDisabled={modification?.modificationType === ModificationType.FreePeriod}
                color={lesson.lessonData.course.subject.userRelation.color}
                startTime={lesson.lessonData.startTime}
                endTime={lesson.lessonData.endTime}
            >
                <Badges>
                    {homeworkCount > 0 && <HomeworkBadge count={homeworkCount} />}
                    {materialCount > 0 && <MaterialBadge count={materialCount} />}
                    {modification?.modificationType === ModificationType.RoomChange && <RoomChangeBadge />}
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

export default LessonEvent;
