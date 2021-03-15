import {StudentWeekView} from "types";
import {Dayjs} from "dayjs";
import {createContext} from "react";

export interface ITimetableContext extends StudentWeekView {
    date: Dayjs;
    onDateChange: (newDate: Dayjs) => any;

    view: "month" | "work_week" | "day";
    onViewChange: (newView: any) => any;

    selectedDate: Dayjs | null;
    onSelectedDateChange: (newDate: Dayjs | null) => any;

    selectedColor: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const TimetableContext = createContext<ITimetableContext>();

export default TimetableContext;
