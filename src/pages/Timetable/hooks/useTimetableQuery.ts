import {useQuery} from "react-query";
import {AxiosError} from "axios";
import _ from "lodash";
import {Dispatch, SetStateAction, useMemo} from "react";
import {StudentWeekView} from "types";
import {useQueryOptions} from "hooks";
import {IFetchStudentDayData, useFetchStudentWeekAPI} from "hooks/apis";
import {getMinMaxTime} from "utils";
import {Dayjs} from "dayjs";
import {Event as CalendarEvent} from "react-big-calendar";

import getEvents from "../getEvents";
import {ITimetableContext} from "../TimetableContext";

export interface IUseTimetableQueryOptions {
    timetable?: StudentWeekView;
    updateTimetable: Dispatch<SetStateAction<StudentWeekView>>;

    view: ITimetableContext["view"];

    onFirstSuccess: () => any;

    queryStartDate: Dayjs;
    queryEndDate: Dayjs;
}

export interface IUseTimetableQueryResult {
    isLoading: boolean;
    minTime: Date;
    maxTime: Date;
    events: CalendarEvent[];

    error: AxiosError | null;
}

const useTimetableQuery = ({
    timetable,
    updateTimetable,
    view,
    onFirstSuccess,
    queryEndDate,
    queryStartDate,
}: IUseTimetableQueryOptions): IUseTimetableQueryResult => {
    const queryOptions = useQueryOptions();
    const fetchWeek = useFetchStudentWeekAPI();

    const events = useMemo(
        () => (timetable ? getEvents(timetable, view, queryStartDate) : []),
        [timetable, view, queryStartDate],
    );
    const [minTime, maxTime] = useMemo(() => getMinMaxTime(events), [events]);

    const {
        isLoading,
        error,
    } = useQuery<StudentWeekView, AxiosError>(
        ["fetch_week", {
            startDate: queryStartDate,
            endDate: queryEndDate,
        }],
        context => fetchWeek(context.queryKey[1] as IFetchStudentDayData),
        {
            ...queryOptions,
            onSuccess: async newTimetable => {
                if (!_.isEqual(timetable, newTimetable)) {
                    updateTimetable(newTimetable);
                }
                onFirstSuccess();
            },
        },
    );

    return {
        error,
        isLoading,
        minTime,
        maxTime,
        events,
    };
};

export default useTimetableQuery;
