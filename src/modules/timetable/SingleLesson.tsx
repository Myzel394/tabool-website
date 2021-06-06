import React, {CSSProperties} from "react";
import {StudentLessonDetail} from "types";
import {Link} from "@material-ui/core";
import {buildPath, findNextDate, getEndTime, getStartTime, lazyDatetime, replaceDatetime} from "utils";
import dayjs, {Dayjs} from "dayjs";

import {Badges, ExamBadge, HomeworkBadge, Lesson, LessonContent, MaterialBadge, VideoConferenceBadge} from "./Lesson";


export interface LessonEventProps {
    lesson: StudentLessonDetail;

    homeworkCount?: number;
    materialCount?: number;
    hasExam?: boolean;
    hasVideoConference?: boolean;
    style?: CSSProperties;
    showDetails?: boolean;
    date?: Dayjs;
    disableLinkWrapper?: boolean;
}


const isVideoConferenceActive = (lesson: StudentLessonDetail): boolean => {
    const startTime = replaceDatetime(dayjs(getStartTime(lesson.startHour)), "date");
    const endTime = replaceDatetime(dayjs(getEndTime(lesson.endHour)), "date");
    const now = dayjs();

    return startTime.isBefore(now) && endTime.isAfter(now);
};

const SingleLesson = ({
    lesson,
    homeworkCount,
    materialCount,
    hasVideoConference,
    hasExam,
    style,
    showDetails,
    date,
    disableLinkWrapper,
}: LessonEventProps) => {
    const badges = [
        homeworkCount && <HomeworkBadge count={homeworkCount} />,
        materialCount && <MaterialBadge count={materialCount} />,
        hasVideoConference && <VideoConferenceBadge isActive={isVideoConferenceActive(lesson)} />,
        hasExam && <ExamBadge />,
    ].filter(Boolean) as JSX.Element[];

    const lessonContent = (
        <Lesson
            color={lesson.course.subject.userRelation.color}
            startTime={dayjs(getStartTime(lesson.startHour))}
            endTime={dayjs(getEndTime(lesson.endHour))}
        >
            <Badges badges={badges} />
            <LessonContent
                showDetails={showDetails}
                courseName={lesson.course.name}
                roomName={lesson.course.room.place}
                teacherName={lesson.course.teacher.lastName}
                style={style}
            />
        </Lesson>
    );

    if (disableLinkWrapper) {
        return lessonContent;
    }

    return (
        <Link
            href={buildPath("/agenda/lesson/detail/:id/:date/", {
                id: lesson.id,
                date: lazyDatetime(date ?? findNextDate(dayjs(), lesson.weekday), "date") || "",
            })}
            underline="none"
        >
            {lessonContent}
        </Link>
    );
};

export default SingleLesson;
