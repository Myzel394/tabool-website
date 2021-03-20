import {StudentWeekView} from "types";
import {Dayjs} from "dayjs";
import {createContext, Dispatch, SetStateAction} from "react";

export interface ITimetableContext extends StudentWeekView {
    date: Dayjs;
    onDateChange: (newDate: Dayjs) => any;

    view: "month" | "work_week" | "day";
    onViewChange: (newView: any) => any;

    selectedDate: Dayjs | null;
    onSelectedDateChange: (newDate: Dayjs | null) => any;

    selectedColor: string;

    timetable: StudentWeekView;
    onTimetableChange: Dispatch<SetStateAction<StudentWeekView>>;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const TimetableContext = createContext<ITimetableContext>();

export default TimetableContext;
