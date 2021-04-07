import React, {CSSProperties} from "react";
import {TeacherLessonDetail} from "types";
import dayjs from "dayjs";
import {buildPath, findNextDate, getEndTime, getStartTime, lazyDatetime} from "utils";
import {Badges, ButtonLike, Lesson as LessonComponent, LessonContent, VideoConferenceBadge} from "components";
import {Link} from "@material-ui/core";

import createShadow from "../../createShadow";


export interface ILesson {
    lesson: TeacherLessonDetail;
    isLessonSelectMode: boolean;
    hasVideoConference: boolean;
    onLessonSelect?: (lesson: TeacherLessonDetail) => any;
}

const buttonStyle: CSSProperties = {
    width: "100%",
    display: "block",
    textAlign: "inherit",
};

const Lesson = ({
    isLessonSelectMode,
    lesson,
    onLessonSelect,
    hasVideoConference,
}: ILesson) => {
    const badges = [
        hasVideoConference && <VideoConferenceBadge />,
    ].filter(Boolean) as JSX.Element[];

    const lessonContent = (
        <LessonComponent
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
        </LessonComponent>
    );

    return isLessonSelectMode ? (
        <ButtonLike
            p={0}
            style={buttonStyle}
            onClick={() => onLessonSelect?.(lesson)}
        >
            {lessonContent}
        </ButtonLike>
    ) : (
        <Link
            href={buildPath("/agenda/lesson/detail/:id/:date/", {
                id: lesson.id,
                date: lazyDatetime(findNextDate(dayjs(), lesson.weekday), "date"),
            })}
            underline="none"
        >
            {lessonContent}
        </Link>
    );
};

export default Lesson;
