import React, {useEffect, useState} from "react";
import {Badges, HomeworkBadge, Lesson, LessonContent, MaterialBadge, RoomChangeBadge} from "components";
import {LessonDetail, ModificationDetail, ModificationType} from "types";
import {useMemoOne} from "use-memo-one";
import {Grow} from "@material-ui/core";

import styles from "./LessonEvent.module.scss";

export interface ILessonEvent {
    homeworkCount: number;
    materialCount: number;
    lesson: LessonDetail;
    showWhenFreePeriod: boolean;
    animate: boolean;

    modification?: ModificationDetail;
}

const LessonEvent = ({homeworkCount, materialCount, lesson, modification, showWhenFreePeriod, animate}: ILessonEvent) => {
    const delay = useMemoOne(() => Math.ceil(Math.random() * 0), []);
    const [isIn, setIsIn] = useState<boolean>(false);

    useEffect(() => {
        const timeoutRef = setTimeout(() => setIsIn(true), delay);

        return () => clearTimeout(timeoutRef);
    }, [delay]);

    const isFreePeriod = modification?.modificationType === ModificationType.FreePeriod ||
        modification?.modificationType === ModificationType.SelfLearn;

    if (isFreePeriod && !showWhenFreePeriod) {
        return null;
    }

    const courseName = modification?.newSubject?.name ?? lesson.lessonData.course.name;
    const roomName = modification?.newRoom?.place ?? lesson.lessonData.room.place;
    const teacherName = modification?.newTeacher?.lastName ?? lesson.lessonData.course.teacher.lastName;

    const hasHomeworkBadge = homeworkCount > 0;
    const hasMaterialBadge = materialCount > 0;
    const hasModificationBadge = modification?.modificationType === ModificationType.RoomChange;

    const children = (
        <Lesson
            isDisabled={isFreePeriod}
            color={lesson.lessonData.course.subject.userRelation.color}
            startTime={lesson.lessonData.startTime}
            endTime={lesson.lessonData.endTime}
        >
            <Badges>
                {hasHomeworkBadge && <HomeworkBadge count={homeworkCount} />}
                {hasMaterialBadge && <MaterialBadge count={materialCount} />}
                {hasModificationBadge && <RoomChangeBadge />}
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

    if (animate) {
        return (
            <Grow unmountOnExit mountOnEnter in={isIn}>
                {children}
            </Grow>
        );
    } else {
        return children;
    }
};

export default LessonEvent;
