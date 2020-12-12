import React, {useEffect, useRef, useState} from "react";
import {Badges, HomeworkBadge, Lesson, LessonContent, MaterialBadge, RoomChangeBadge} from "components";
import {LessonDetail, ModificationDetail, ModificationType} from "types";
import {useMemoOne} from "use-memo-one";
import {Link} from "@material-ui/core";
import {generatePath} from "react-router-dom";

import PureSkeleton from "../../../states/PureSkeleton";

import styles from "./LessonEvent.module.scss";

export interface ILessonEvent {
    homeworkCount: number;
    materialCount: number;
    lesson: LessonDetail;
    showWhenFreePeriod: boolean;
    showDetails: boolean;
    animate: boolean;

    modification?: ModificationDetail;
}

const LessonEvent = ({homeworkCount, materialCount, lesson, modification, showWhenFreePeriod, showDetails}: ILessonEvent) => {
    const delay = useMemoOne(() => Math.ceil(Math.random() * 0), []);
    const $children = useRef<any>();
    const [isIn, setIsIn] = useState<boolean>(false);
    const isFreePeriod = modification?.modificationType === ModificationType.FreePeriod ||
        modification?.modificationType === ModificationType.SelfLearn;

    useEffect(() => {
        const timeoutRef = setTimeout(() => setIsIn(true), delay);

        return () => clearTimeout(timeoutRef);
    }, [delay]);

    useEffect(() => {
        const handle = async () => {
            const courseName = modification?.newSubject?.name ?? lesson.lessonData.course.name;
            const roomName = modification?.newRoom?.place ?? lesson.lessonData.room.place;
            const teacherName = modification?.newTeacher?.lastName ?? lesson.lessonData.course.teacher.lastName;

            const hasHomeworkBadge = homeworkCount > 0;
            const hasMaterialBadge = materialCount > 0;
            const hasModificationBadge = modification?.modificationType === ModificationType.RoomChange;

            $children.current = (
                <Link
                    href={generatePath("/lesson/detail/:id/", {
                        id: lesson.id,
                    })}
                >
                    <Lesson
                        isDisabled={isFreePeriod}
                        color={lesson.lessonData.course.subject.userRelation.color}
                        startTime={lesson.lessonData.startTime}
                        endTime={lesson.lessonData.endTime}
                    >
                        <Badges>
                            {[
                                hasHomeworkBadge && <HomeworkBadge key={`homework_${lesson.id}`} count={homeworkCount} />,
                                hasMaterialBadge && <MaterialBadge key={`material_${lesson.id}`} count={materialCount} />,
                                hasModificationBadge && <RoomChangeBadge key={`room_${lesson.id}`} />,
                            ]}
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
                            showDetails={showDetails}
                        />
                    </Lesson>
                </Link>
            );
        };

        handle();
    }, [homeworkCount, isFreePeriod, lesson, materialCount, modification, showDetails]);

    if (isFreePeriod && !showWhenFreePeriod) {
        return null;
    }

    return $children.current ?? <PureSkeleton />;
};

export default LessonEvent;
