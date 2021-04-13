import {TeacherDailyDataView, TeacherLessonDetail} from "types";
import {createContext, Dispatch, SetStateAction} from "react";
import {Dayjs} from "dayjs";

export interface IStartPageContext {
    dailyData: TeacherDailyDataView;
    onDailyDataChange: Dispatch<SetStateAction<TeacherDailyDataView>>;

    date: Dayjs;
    setDate: (newDate: Dayjs) => any;

    scrollBack: () => any;
    requestLesson: () => Promise<TeacherLessonDetail>;
    isLessonSelectMode: boolean;
    selectedLesson: TeacherLessonDetail | null;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const StartPageContext = createContext<IStartPageContext>();

export default StartPageContext;
