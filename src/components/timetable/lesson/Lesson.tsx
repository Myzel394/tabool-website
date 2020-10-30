import React, {ReactNode, useMemo} from "react";
import {Dayjs} from "dayjs";

import LessonContext from "./LessonContext";

export interface ILesson {
    children: ReactNode;
    startTime: Dayjs;
    endTime: Dayjs;
    color: string;
    isDisabled?: boolean;
    isSingle?: boolean;
}


const Lesson = ({
    children,
    startTime,
    endTime,
    color,
    isDisabled,
    isSingle,
}: ILesson) => {
    const contextValue = useMemo(() => ({
        color,
        startTime,
        endTime,
        isDisabled: isDisabled ?? false,
        isSingle: isSingle ?? false,
    }), [color, isDisabled, startTime, endTime, isSingle]);

    return (
        <LessonContext.Provider value={contextValue}>
            {children}
        </LessonContext.Provider>
    );
};

Lesson.defaultProps = {
    isDisabled: false,
};

export default Lesson;

