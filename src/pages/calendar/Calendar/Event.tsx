import React, {useEffect, useMemo, useState} from "react";
import {Badges, HomeworkBadge, Lesson, LessonContent, MaterialBadge} from "components/timetable/Lesson";
import {LessonDetail} from "types";
import {Grow} from "@material-ui/core";
import {useQuery} from "react-query";
import {useFetchHomeworkListAPI, useFetchMaterialListAPI, useQueryOptions} from "hooks";

const stringifyPercent = (value: string | number): string => (typeof value === "string" ? value : `${value}%`);

const Event = (props) => {
    const {
        event,
        style,
    } = props;
    const {height, top, width, xOffset} = style;
    const [isGrowIn, setIsGrowIn] = useState<boolean>(false);
    const divStyle = useMemo(() => ({
        top: stringifyPercent(top),
        left: stringifyPercent(xOffset),
        width: stringifyPercent(width),
        height: stringifyPercent(height),
        position: "absolute" as "absolute",
    }), [height, top, width, xOffset]);
    const lesson: LessonDetail = event.resource;
    const delay = event.resource.delay;

    const fetchMaterial = useFetchMaterialListAPI();
    const fetchHomework = useFetchHomeworkListAPI();
    const queryOptions = useQueryOptions();
    const homeworkQuery = useQuery([`lesson_${lesson.id}_homeworks`, {
        lessonId: lesson.id,
    }], fetchHomework, queryOptions);
    const materialQuery = useQuery([`lesson_${lesson.id}_materials`, {
        lessonId: lesson.id,
    }], fetchMaterial, queryOptions);
    const homeworkAmount = homeworkQuery.data?.results?.length;
    const materialAmount = materialQuery.data?.results?.length;

    useEffect(() => {
        const delayTimeout = setTimeout(() => setIsGrowIn(true), delay);

        return () => clearTimeout(delayTimeout);
    }, [delay]);

    return (
        <Grow in={isGrowIn}>
            <div style={divStyle}>
                <Lesson
                    isSmall
                    color={lesson.lessonData.course.subject.userRelation.color}
                    startTime={lesson.lessonData.startTime}
                    endTime={lesson.lessonData.endTime}
                >
                    <Badges>
                        {homeworkAmount > 0 ? <HomeworkBadge count={homeworkAmount} /> : <></>}
                        {materialAmount > 0 ? <MaterialBadge count={materialAmount} /> : <></>}
                    </Badges>
                    <LessonContent
                        courseName={lesson.lessonData.course.name}
                        roomName={lesson.lessonData.room.place}
                        teacherName={lesson.lessonData.course.teacher.lastName}
                    />
                </Lesson>
            </div>
        </Grow>
    );
};

export default Event;
