import LessonContext from "./LessonContext";
import React, {ReactNode, useMemo} from "react";
import {Dayjs} from "dayjs";

export interface ILesson {
    children: ReactNode;
    startTime: Dayjs;
    endTime: Dayjs;
    color: string;
    isDisabled?: boolean;
}

const Lesson = ({
                    children,
                    startTime,
                    endTime,
                    color,
                    isDisabled,
                }: ILesson) => {
    isDisabled = isDisabled ?? false;
    const contextValue = useMemo(() => ({
        color,
        isDisabled,
        startTime,
        endTime,
    }), [color, isDisabled, startTime, endTime]);

    return (
        <LessonContext.Provider value={contextValue}>
            {children}
        </LessonContext.Provider>
    );
};

Lesson.defaultProps = {
    isDisabled: false,
}

export default Lesson

