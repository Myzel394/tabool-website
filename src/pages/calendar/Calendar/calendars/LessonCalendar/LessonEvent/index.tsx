import React from "react";
import {Badges, HomeworkBadge, Lesson, LessonContent, MaterialBadge, RoomChangeBadge} from "components";
import {LessonDetail, ModificationDetail, ModificationType} from "types";

import styles from "./LessonEvent.module.scss";

export interface ILessonEvent {
    homeworkCount: number;
    materialCount: number;
    lesson: LessonDetail;
    showWhenFreePeriod: boolean;

    modification?: ModificationDetail;
}

const LessonEvent = ({homeworkCount, materialCount, lesson, modification, showWhenFreePeriod}: ILessonEvent) => {
    const isFreePeriod = modification?.modificationType === ModificationType.FreePeriod ||
        modification?.modificationType === ModificationType.SelfLearn;

    if (isFreePeriod && !showWhenFreePeriod) {
        return null;
    }

    const courseName = modification?.newSubject?.name ?? lesson.lessonData.course.name;
    const roomName = modification?.newRoom?.place ?? lesson.lessonData.room.place;
    const teacherName = modification?.newTeacher?.lastName ?? lesson.lessonData.course.teacher.lastName;

    return (
        <Lesson
            isSmall
            isDisabled={isFreePeriod}
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
                courseName={courseName}
                roomName={roomName}
                teacherName={teacherName}
                className={[
                    styles.wrapper,
                    {
                        [styles.isModificationAvailable]: modification !== undefined,
                        [styles.isReplacement]: modification?.modificationType === ModificationType.Replacement,
                    },
                ]}
            />
        </Lesson>
    );
};

export default LessonEvent;
