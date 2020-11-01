import React, {memo, useEffect, useState} from "react";
import {Grow} from "@material-ui/core";
import {Dayjs} from "dayjs";
import {Lesson as TimetableLesson, LessonContent} from "components";

export interface ILesson {
    delay: number;
    startTime: Dayjs;
    endTime: Dayjs;
    color: string;
    courseName: string;
    roomName: string;
    teacherName: string;
    isDisabled: boolean;
}

const Lesson = ({
    delay,
    startTime,
    endTime,
    teacherName,
    color,
    courseName,
    roomName,
    isDisabled,
}: ILesson) => {
    const [isGrowIn, setIsGrowIn] = useState<boolean>(false);

    useEffect(() => {
        const delayTimeout = setTimeout(() => setIsGrowIn(true), delay);

        return () => clearTimeout(delayTimeout);
    }, [delay]);

    return (
        <Grow in={isGrowIn}>
            <TimetableLesson
                startTime={startTime}
                endTime={endTime}
                color={color}
                isDisabled={isDisabled}
                isSingle={endTime.diff(startTime, "minute") <= 45}
            >
                <LessonContent
                    courseName={courseName}
                    roomName={roomName}
                    teacherName={teacherName}
                />
            </TimetableLesson>
        </Grow>
    );
};

export default memo(Lesson);
