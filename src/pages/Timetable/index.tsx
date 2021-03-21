import React, {useLayoutEffect, useMemo, useState} from "react";
import {useFetchStudentWeekAPI} from "hooks/apis";
import {useQuery} from "react-query";
import {StudentWeekView} from "types";
import {AxiosError} from "axios";
import {usePrevious, useQueryOptions, useWindowSize} from "hooks";
import dayjs, {Dayjs} from "dayjs";
import {LoadingPage, ResponseWrapper} from "components";
import {useTranslation} from "react-i18next";
import {useTheme} from "@material-ui/core";
import tinycolor from "tinycolor2";
import {findNextDate} from "utils";
import _ from "lodash";
import {useSwipeable} from "react-swipeable";

import TimetableContext, {ITimetableContext} from "./TimetableContext";
import Calendar from "./Calendar";
import BottomInformation from "./BottomInformation";
import getEvents from "./getEvents";

const getDates = (view: ITimetableContext["view"], activeDate: Dayjs): [Dayjs, Dayjs] => {
    switch (view) {
        case "month": {
            const startOfMonth = activeDate.startOf("month");
            const endOfMonth = activeDate.endOf("month");
            const paddedEnd = findNextDate(endOfMonth, 0);

            return [startOfMonth, paddedEnd];
        }
        case "day":
        case "work_week": {
            const startOfWeek = activeDate.startOf("week");
            const endOfWorkWeek = activeDate.endOf("week").subtract(1, "day");

            return [startOfWeek, endOfWorkWeek];
        }
    }
};

const Timetable = () => {
    const theme = useTheme();
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchWeek = useFetchStudentWeekAPI();
    const [width] = useWindowSize();

    const [view, setView] = useState<ITimetableContext["view"]>("month");
    const [startDate, setStartDate] = useState<Dayjs>(dayjs);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [timetable, setTimetable] = useState<StudentWeekView>();

    const previousStartDate = usePrevious(startDate, dayjs());
    const events = useMemo(() => (timetable ? getEvents(timetable, view) : []), [timetable, view]);
    const swipeHandlers = useSwipeable({
        delta: width * 0.25,
        onSwipedLeft: () => {
            switch (view) {
                case "month":
                    setStartDate(prevDate => prevDate.add(1, "month"));
                    break;
                case "work_week":
                    setStartDate(prevDate => prevDate.add(1, "week"));
                    break;
                case "day":
                    setStartDate(prevDate => prevDate.add(1, "day"));
                    break;
            }
        },
        onSwipedRight: () => {
            switch (view) {
                case "month":
                    setStartDate(prevDate => prevDate.subtract(1, "month"));
                    break;
                case "work_week":
                    setStartDate(prevDate => prevDate.subtract(1, "week"));
                    break;
                case "day":
                    setStartDate(prevDate => prevDate.subtract(1, "day"));
                    break;
            }
        },
    });

    const [queryStartDate, queryEndDate] = getDates(view, startDate);
    const selectedColor = tinycolor(theme.palette.text.primary)
        .setAlpha(0.1)
        .toString();

    const {
        data,
        isLoading,
        error,
    } = useQuery<StudentWeekView, AxiosError>(
        ["fetch_week", {
            startDate: queryStartDate,
            endDate: queryEndDate,
        }],
        context => fetchWeek(context.queryKey[1]),
        {
            ...queryOptions,
            onSuccess: async newTimetable => {
                if (!_.isEqual(timetable, newTimetable)) {
                    setTimetable(newTimetable);
                }
            },
        },
    );

    useLayoutEffect(() => {
        if (selectedDate) {
            if (startDate.isSame(previousStartDate, "month")) {
                setStartDate(selectedDate);
            } else {
                setSelectedDate(null);
            }
        }
    }, [selectedDate, startDate, previousStartDate]);

    return (
        <ResponseWrapper<StudentWeekView>
            isLoading={isLoading}
            data={data}
            error={error}
            getDocumentTitle={() => t("Stundenplan ({{startDate}} - {{endDate}})", {
                startDate: queryStartDate.format("l"),
                endDate: queryEndDate.format("l"),
            })}
            renderLoading={() => <LoadingPage title={t("Stundenplan wird geladen...")} />}
        >
            {() => (timetable ? (
                <div {...swipeHandlers}>
                    <TimetableContext.Provider
                        value={{
                            ...timetable,
                            view,
                            selectedColor,
                            selectedDate,
                            timetable,
                            calendarEvents: events,
                            date: startDate,
                            onDateChange: setStartDate,
                            onViewChange: setView,
                            onSelectedDateChange: setSelectedDate,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore: Timetable is set here
                            onTimetableChange: setTimetable,
                        }}
                    >
                        <Calendar />
                        <BottomInformation />
                    </TimetableContext.Provider>
                </div>
            ) : null)}
        </ResponseWrapper>
    );
};
export default Timetable;


