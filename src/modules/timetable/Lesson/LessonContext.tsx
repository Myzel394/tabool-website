import {createContext} from "react";
import {Dayjs} from "dayjs";

export interface ILesson {
    color: string;
    isDisabled: boolean;
    startTime: Dayjs;
    endTime: Dayjs;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const LessonContext = createContext<ILesson>({});

export default LessonContext;
