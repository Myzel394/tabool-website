import {TeacherDailyDataView, TeacherLessonDetail} from "types";
import {Dayjs} from "dayjs";


export interface ActionComponentProps {
    lesson: TeacherLessonDetail;
    date: Dayjs;
    dailyData: TeacherDailyDataView;
    onDailyDataChange: (dailyData: TeacherDailyDataView) => any;
}
