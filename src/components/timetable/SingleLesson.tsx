import React, {CSSProperties} from "react";
import {StudentLessonDetail} from "types";
import {Badges, HomeworkBadge, Lesson, LessonContent, MaterialBadge} from "components/index";
import {Link} from "@material-ui/core";
import {buildPath, findNextDate, getEndTime, getStartTime, lazyDatetime} from "utils";
import dayjs from "dayjs";


export interface ILessonEvent {
    lesson: StudentLessonDetail;

    homeworkCount?: number;
    materialCount?: number;
    style?: CSSProperties;
}

const SingleLesson = ({
    lesson,
    homeworkCount,
    materialCount,
    style,
}: ILessonEvent) => {
    const badges = [
        homeworkCount && <HomeworkBadge count={homeworkCount} />,
        materialCount && <MaterialBadge count={materialCount} />,
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
                    style={style}
                />
            </Lesson>
        </Link>
    );
};

export default SingleLesson;
