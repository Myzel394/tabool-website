import React from "react";
import {LessonRelatedDetail, ModificationDetail} from "types";
import {Link} from "@material-ui/core";
import {
    Badges,
    HomeworkBadge,
    Lesson,
    LessonContent,
    MaterialBadge,
    RoomChangeBadge,
    VideoConferenceBadge,
} from "components";
import {ModificationType} from "api";
import {buildPath} from "utils";

import styles from "./LessonEvent.module.scss";


export interface ILessonEvent {
    homeworkCount: number;
    materialCount: number;
    lesson: LessonRelatedDetail;
    showWhenFreePeriod: boolean;
    showDetails: boolean;

    modification?: ModificationDetail;
}

const LessonEvent = ({
    homeworkCount,
    materialCount,
    lesson,
    modification,
    showWhenFreePeriod,
    showDetails,
}: ILessonEvent) => {
    const isFreePeriod = modification?.modificationType === ModificationType.FreePeriod ||
        modification?.modificationType === ModificationType.SelfLearn;

    const courseName = modification?.newSubject?.name ?? lesson.course.name;
    const roomName = modification?.newRoom?.place ?? lesson.room.place;
    const teacherName = modification?.newTeacher?.lastName ?? lesson.course.teacher.lastName;

    const hasHomeworkBadge = homeworkCount > 0;
    const hasMaterialBadge = materialCount > 0;
    const hasModificationBadge = modification?.modificationType === ModificationType.RoomChange;
    const {videoConferenceLink} = lesson;
    const hasVideoConference = videoConferenceLink !== null;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Filter is ignored
    const badges: JSX.Element[] = ([
        hasHomeworkBadge && <HomeworkBadge key={`homework_${lesson.id}`} count={homeworkCount} />,
        hasMaterialBadge && <MaterialBadge key={`material_${lesson.id}`} count={materialCount} />,
        hasModificationBadge && <RoomChangeBadge key={`room_${lesson.id}`} />,
        hasVideoConference && <VideoConferenceBadge key={`video_conference_${lesson.id}`} isActive />,
    ].filter(Boolean));

    return (!showWhenFreePeriod && isFreePeriod) ? null : (
        <Link
            href={buildPath("/agenda/lesson/detail/:id/", {
                id: lesson.id,
            })}
        >
            <Lesson
                isDisabled={isFreePeriod}
                color={lesson.course.subject.userRelation.color}
                startTime={lesson.startTime}
                endTime={lesson.endTime}
            >
                <Badges
                    badges={badges}
                />
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
