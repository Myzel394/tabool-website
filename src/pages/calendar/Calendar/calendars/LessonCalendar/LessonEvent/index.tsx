import React from "react";
import {LessonDetail, ModificationDetail, ModificationType} from "types";
import {Link} from "@material-ui/core";
import {generatePath} from "react-router-dom";
import {Badges, HomeworkBadge, Lesson, LessonContent, MaterialBadge, RoomChangeBadge} from "components";

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
    const isFreePeriod = modification?.modificationType === ModificationType.FreePeriod ||
        modification?.modificationType === ModificationType.SelfLearn;

    const courseName = modification?.newSubject?.name ?? lesson.lessonData.course.name;
    const roomName = modification?.newRoom?.place ?? lesson.lessonData.room.place;
    const teacherName = modification?.newTeacher?.lastName ?? lesson.lessonData.course.teacher.lastName;

    const hasHomeworkBadge = homeworkCount > 0;
    const hasMaterialBadge = materialCount > 0;
    const hasModificationBadge = modification?.modificationType === ModificationType.RoomChange;

    return (!showWhenFreePeriod && isFreePeriod) ? null : (
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
                    ].filter(Boolean)}
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

export default LessonEvent;
