import React, {ReactNode, useMemo} from "react";
import {Dayjs} from "dayjs";

import LessonContext from "./LessonContext";

export interface ILesson {
    children: ReactNode;
    startTime: Dayjs;
    endTime: Dayjs;
    color: string;
    style?: any;
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
    style,
}: ILesson) => {
    const contextValue = useMemo(() => ({
        color,
        startTime,
        endTime,
        isDisabled: isDisabled ?? false,
        isSingle: isSingle ?? false,
    }), [color, isDisabled, startTime, endTime, isSingle]);

    return (
        <div style={style}>
            <LessonContext.Provider value={contextValue}>
                {children}
            </LessonContext.Provider>
        </div>
    );
};

Lesson.defaultProps = {
    isDisabled: false,
};

export default Lesson;

