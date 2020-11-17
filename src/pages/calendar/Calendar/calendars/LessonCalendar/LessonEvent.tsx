import React, {memo} from "react";
import {Badges, HomeworkBadge, Lesson, LessonContent, MaterialBadge} from "components/timetable/Lesson";
import {LessonDetail, ModificationDetail, ModificationTypeOptions} from "types";
import {RoomChangeBadge} from "components";
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
        <div className={clsx(styles.transition, {
            [styles.isModificationAvailable]: modification !== undefined
        })}>
            <Lesson
                isSmall
                isDisabled={modification?.modificationType === ModificationTypeOptions.FREE_PERIOD}
                color={lesson.lessonData.course.subject.userRelation.color}
                startTime={lesson.lessonData.startTime}
                endTime={lesson.lessonData.endTime}
            >
                <Badges>
                    {homeworkCount > 0 && <HomeworkBadge count={homeworkCount} />}
                    {materialCount > 0 && <MaterialBadge count={materialCount} />}
                    {modification?.modificationType === ModificationTypeOptions.ROOM_CHANGE && <RoomChangeBadge />}
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
