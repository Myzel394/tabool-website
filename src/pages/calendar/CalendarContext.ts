/* eslint-disable @typescript-eslint/ban-ts-comment */
import {createContext} from "react";
import {EventDetail, HomeworkApprox, LessonDetail, MaterialApprox, ModificationDetail} from "types";
import {Dayjs} from "dayjs";
import {View} from "react-big-calendar";

export type CalendarType = "lesson" | "homeworkDue" | "homeworkCreated";

export interface ICalendarContext<TEvent extends object = object> {
    lessons: LessonDetail[];
    modifications: ModificationDetail[];
    events: EventDetail[];
    homeworks: HomeworkApprox[];
    materials: MaterialApprox[];

    onViewChange: (newView: View) => any;
    activeView: View;

    onCalendarTypeChange: (newType: CalendarType) => any;
    calendarType: CalendarType;

    onDateChange: (newDate: Dayjs) => any;
    date: Dayjs;

    showFreePeriods: boolean;
    onShowFreePeriodsChange: (value: boolean) => any;

    isSettingsExpanded: boolean;
    onIsSettingsExpanded: (value: boolean) => any;

    isCalendarOpened: boolean;
    onCalendarOpenedChange: (value: boolean) => any;

    earliestDateAvailable: Dayjs;
    latestDateAvailable: Dayjs;

    animate: boolean;
}


// @ts-ignore
const CalendarContext = createContext<ICalendarContext>({});

export default CalendarContext;
