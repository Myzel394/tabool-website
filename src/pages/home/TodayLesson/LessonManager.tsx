import React, {memo} from "react";
import {useFetchLessonDetailAPI, useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {LoadingIndicator} from "components";
import {LessonDetail} from "types";

import Lesson from "./Lesson";

export interface ColorType {
    color: string;
    attendance: boolean;
}
export interface ILesson {
    lessonId: string;
    delay: number;
    onColor: (data: ColorType) => void;
}

const LessonManager = ({lessonId, delay, onColor}: ILesson) => {
    const fetchLesson = useFetchLessonDetailAPI();
    const queryOptions = useQueryOptions();
    const {data, isLoading} = useQuery(lessonId, fetchLesson, {
        ...queryOptions,
        onSuccess: (lesson) => {
            if (lesson?.userRelation?.attendance) {
                const color = lesson.lessonData.course.subject.userRelation.color;
                const attendance = lesson.userRelation.attendance;

                if (color) {
                    onColor({
                        color,
                        attendance,
                    });
                }
            }
        },
    });
    const lesson: LessonDetail = data;

    return (
        <LoadingIndicator isLoading={isLoading}>
            {() =>
                <Lesson
                    delay={delay}
                    startTime={lesson.lessonData.startTime}
                    endTime={lesson.lessonData.endTime}
                    color={lesson.lessonData.course.subject.userRelation.color}
                    courseName={lesson.lessonData.course.name}
                    roomName={lesson.lessonData.room.place}
                    teacherName={lesson.lessonData.course.teacher.lastName}
                    isDisabled={!lesson.userRelation.attendance}
                />
            }
        </LoadingIndicator>
    );
};

export default memo(LessonManager);
