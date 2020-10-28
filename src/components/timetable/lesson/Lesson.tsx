import React, {memo} from "react";
import {Dayjs} from "dayjs";

export interface ILesson {
    startTime: Dayjs;
    endTime: Dayjs;
    color: string;
    teacherName: string;
    subjectName: string;
}

const Lesson = ({color, endTime, startTime, subjectName, teacherName}: ILesson) => {
    return (
        <div
            style={{
                backgroundColor: color,
            }}
        />
    );
};

export default memo(Lesson);
