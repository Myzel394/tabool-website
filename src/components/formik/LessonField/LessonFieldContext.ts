import {StudentLessonDetail} from "types";
import {Dayjs} from "dayjs";
import {createContext} from "react";

export interface LessonIdentifier {
    id: string;
    date: Dayjs;
}

export interface ILessonFieldContext {
    lessons?: StudentLessonDetail[];

    activeDate: Date;
    onActiveDateChange: (date: Date) => any;

    selectedLessonId?: string;
    selectedLessonDate?: Dayjs;

    onLessonSelect: (identifier: LessonIdentifier | null) => any;

    required: boolean;
    disableNavigation: boolean;

    allowedCourses?: string[];
    allowedLessons?: string[];
    allowedWeekdays?: number[];
    allowedMinTime?: Dayjs;
    allowedMaxTime?: Dayjs;
    allowedMinDate?: Dayjs;
    allowedMaxDate?: Dayjs;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const LessonFieldContext = createContext<ILessonFieldContext>({});

export default LessonFieldContext;
