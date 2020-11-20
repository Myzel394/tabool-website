import React, {ComponentType, useMemo} from "react";
import {useWindowSize} from "hooks";
import {
    Calendar as BigCalendar,
    CalendarProps,
    Event as CalendarEvent,
    EventWrapperProps,
    momentLocalizer,
    View,
} from "react-big-calendar";
import moment from "moment";
import dayjs, {Dayjs} from "dayjs";
import {combineDatetime, replaceDatetime} from "utils";
import update from "immutability-helper";

import "react-big-calendar/lib/css/react-big-calendar.css";
import localeInstance from "./locale";
import Toolbar, {CalendarType, ITypeChanger, IViewChanger} from "./Toolbar";

export interface IDefaultCalendar<TEvent extends object = object> extends Omit<CalendarProps,
    "localizer"
    | "components"
    | "step"
    | "views"
    | "min"
    | "max"
    | "dayLayoutAlgorithm"
    | "date"
    > {
    events: CalendarEvent[];
    onViewChange: IViewChanger["onChange"];
    onCalendarTypeChange: ITypeChanger["onChange"];
    calendarType: ITypeChanger["activeType"];
    onDateChange: (newDate: Dayjs) => any;
    date: Dayjs;
    eventComponent: ComponentType<EventWrapperProps<TEvent>>;
    showFreePeriods: boolean;
    onShowFreePeriodsChange: (value: boolean) => any;
}

export interface IDefaultCalendarManager {
    activeView: View;
    activeType: CalendarType;
    onViewChange: IViewChanger["onChange"];
    onCalendarTypeChange: ITypeChanger["onChange"];
    activeDate: Dayjs;
    onDateChange: (newDate: Dayjs) => any;
    showFreePeriods: boolean;
    onShowFreePeriodsChange: (value: boolean) => any;
}

const timePadding = 20;

const getMinMaxTime = (events: CalendarEvent[]): [Date, Date] => {
    const notAllDayEvents = events.filter(element => !element.allDay);

    const startTimes = notAllDayEvents.map(element =>
        replaceDatetime(dayjs(element.start), "date").unix());
    const endTimes = notAllDayEvents.map(element =>
        replaceDatetime(dayjs(element.end), "date").unix());
    const minUnix = Math.min(...startTimes);
    const maxUnix = Math.max(...endTimes);

    const minTime = dayjs.unix(minUnix);
    const maxTime = dayjs.unix(maxUnix);

    const minDatetime = combineDatetime(dayjs(), minTime);
    const maxDatetime = combineDatetime(dayjs(), maxTime);

    return [
        minDatetime.subtract(timePadding, "minute").toDate(),
        maxDatetime.add(timePadding, "minute").toDate(),
    ];
};


const DefaultCalendar = ({
    style: givenStyles = {},
    events,
    date,
    view,
    onViewChange,
    onCalendarTypeChange,
    calendarType,
    onDateChange,
    eventComponent,
    showFreePeriods,
    onShowFreePeriodsChange,
    ...other
}: IDefaultCalendar) => {
    const height = useWindowSize()[1];

    const [minTime, maxTime] = useMemo(() => getMinMaxTime(events), [events]);
    const style = useMemo(() => update(givenStyles, {
        height: {
            $set: Math.min(2500, Math.max(600, height)),
        },
    }), [givenStyles, height]);
    const components = {
        toolbar: Toolbar({
            onViewChange,
            onCalendarTypeChange,
            calendarType,
            showFreePeriods,
            onShowFreePeriodsChange,
        }),
        eventWrapper: eventComponent,
    };
    const localizer = useMemo(() => momentLocalizer(moment), []);

    return (
        <BigCalendar
            views={["work_week", "day"]}
            localizer={localeInstance}
            style={style}
            min={minTime}
            max={maxTime}
            view={view}
            step={30}
            dayLayoutAlgorithm="no-overlap"
            date={date.toDate()}
            components={components}
            events={events}
            onNavigate={date => onDateChange(dayjs(date))}
            {...other}
        />
    );
};

export default DefaultCalendar;

