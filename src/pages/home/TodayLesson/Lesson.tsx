import React, {memo} from "react";
import {Dayjs} from "dayjs";

export interface ILesson {
    date: Dayjs;
    startTime: Dayjs;
    endTime: Dayjs;
    courseId: string;
}

const Lesson = (props: ILesson) => {
    const queryFunction =

    return null;
};

export default memo(Lesson);
