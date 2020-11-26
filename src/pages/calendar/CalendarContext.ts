/* eslint-disable @typescript-eslint/ban-ts-comment */
import {createContext} from "react";
import {EventDetail, HomeworkApprox, LessonDetail, MaterialApprox, ModificationDetail} from "types";
import {Dayjs} from "dayjs";
import {View} from "react-big-calendar";
import {RefetchOptions} from "react-query/types/core/query";

export type CalendarType = "lesson" | "homework";

export interface ICalendarContext<TEvent extends object = object> {
    lessons: LessonDetail[];
    modifications: ModificationDetail[];
    events: EventDetail[];
    homeworks: HomeworkApprox[];
    materials: MaterialApprox[];

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

    earliestDateAvailable: Dayjs;
    latestDateAvailable: Dayjs;

    refetch: (options?: RefetchOptions) => Promise<any>;
}


// @ts-ignore
const CalendarContext = createContext<ICalendarContext>({});

export default CalendarContext;
