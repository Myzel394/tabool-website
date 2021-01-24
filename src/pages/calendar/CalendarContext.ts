/* eslint-disable @typescript-eslint/ban-ts-comment */
import {createContext} from "react";
import {EventDetail, ExamDetail, HomeworkDetail, LessonRelatedDetail, MaterialDetail, ModificationDetail} from "types";
import {Dayjs} from "dayjs";
import {View} from "react-big-calendar";
import {RefetchOptions} from "react-query";

export type CalendarType = "lesson" | "homework";

export interface ICalendarContext<TEvent extends Record<string, any> = Record<string, any>> {
    lessons: LessonRelatedDetail[];
    events: EventDetail[];
    exams: ExamDetail[];
    homeworks: HomeworkDetail[];
    materials: MaterialDetail[];
    modifications: ModificationDetail[];

    onViewChange: (view: View) => any;
    activeView: View;

    onCalendarTypeChange: (type: CalendarType) => any;
    calendarType: CalendarType;

    onDateChange: (date: Dayjs) => any;
    date: Dayjs;

    showFreePeriods: boolean;
    onShowFreePeriodsChange: (showFreePeriods: boolean) => any;

    showDetails: boolean;
    onShowDetailsChange: (showDetails: boolean) => any;

    earliestDateAvailable?: Dayjs;
    latestDateAvailable?: Dayjs;

    refetch: (options?: RefetchOptions) => Promise<any>;
}


// @ts-ignore
const CalendarContext = createContext<ICalendarContext>({});

export default CalendarContext;
