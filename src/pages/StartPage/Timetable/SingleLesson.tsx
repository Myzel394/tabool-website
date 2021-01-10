import React, {memo, useMemo} from "react";
import {LessonDetail} from "types";
import {Badges, HomeworkBadge, Lesson, LessonContent, MaterialBadge} from "components";
import {generatePath} from "react-router-dom";
import {Link, useTheme} from "@material-ui/core";
import tinycolor from "tinycolor2";


export interface ILessonEvent {
    lesson: LessonDetail;
}

const SingleLesson = ({lesson}: ILessonEvent) => {
    const theme = useTheme();
    const hasHomework = Boolean(lesson.homeworks.length);
    const hasMaterials = Boolean(lesson.materials.length);
    const badges = [
        hasHomework && <HomeworkBadge count={lesson.homeworks.length} />,
        hasMaterials && <MaterialBadge count={lesson.materials.length} />,
    ].filter(Boolean) as JSX.Element[];
    const style = useMemo(() => {
        const shadowColor = tinycolor(lesson.lessonData.course.subject.userRelation.color).setAlpha(0.3);

        return {
            boxShadow: `0 .4em .8em .2em ${shadowColor}`,
        };
    }, [lesson.lessonData.course.subject.userRelation.color]);

    return (
        <Link
            href={generatePath("/agenda/lesson/detail/:id/", {
                id: lesson.id,
            })}
            underline="none"
        >
            <Lesson
                color={lesson.lessonData.course.subject.userRelation.color}
                startTime={lesson.lessonData.startTime}
                endTime={lesson.lessonData.endTime}
            >
                <Badges badges={badges} />
                <LessonContent
                    showDetails
                    courseName={lesson.lessonData.course.name}
                    roomName={lesson.lessonData.room.place}
                    teacherName={lesson.lessonData.course.teacher.lastName}
                    style={style}
                />
            </Lesson>
        </Link>
    );
};

export default memo(SingleLesson);
