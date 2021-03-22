import React, {useRef, useState} from "react";
import {StudentWeekView} from "types";
import {LoadingPage, ResponseWrapper} from "components";
import {useTranslation} from "react-i18next";
import dayjs, {Dayjs} from "dayjs";

import {usePersistentStorage} from "../../hooks";

import TimetableContext, {ITimetableContext} from "./TimetableContext";
import Calendar from "./Calendar";
import BottomInformation from "./BottomInformation";
import {useTimetableDays, useTimetableQuery, useTimetableSwipe} from "./hooks";

const getDateFromHash = (): Dayjs | null => {
    try {
        const date = dayjs(window.location.hash?.slice(1));

        if (date.isValid()) {
            return date;
        }
        // eslint-disable-next-line no-empty
    } catch (err) {
    }

    return null;
};

const Timetable = () => {
    const {t} = useTranslation();

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(getDateFromHash);
    const [startDate, setStartDate] = useState<Dayjs>(dayjs);
    const [view, setView] = usePersistentStorage<ITimetableContext["view"]>("month", "timetable_view");
    const [timetable, setTimetable] = useState<StudentWeekView>();

    const $isInitialLoading = useRef<boolean>(true);

    const [queryStartDate, queryEndDate] = useTimetableDays({
        view,
        startDate,
        selectedDate,
        updateSelectedDate: setSelectedDate,
        updateStartDate: setStartDate,
    });
    const {
        events,
        maxTime,
        minTime,
        error,
        isLoading,
    } = useTimetableQuery({
        view,
        queryStartDate,
        queryEndDate,
        timetable,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        updateTimetable: setTimetable,
        onFirstSuccess: () => $isInitialLoading.current = false,
    });
    const swipeHandlers = useTimetableSwipe(view, setStartDate);

    return (
        <ResponseWrapper<StudentWeekView>
            isLoading={$isInitialLoading.current && isLoading}
            data={timetable}
            error={error}
            getDocumentTitle={() => t("Stundenplan ({{startDate}} - {{endDate}})", {
                startDate: queryStartDate.format("l"),
                endDate: queryEndDate.format("l"),
            })}
            renderLoading={() => <LoadingPage title={t("Stundenplan wird geladen...")} />}
        >
            {() =>
                <div {...swipeHandlers}>
                    <TimetableContext.Provider
                        value={{
                            ...timetable,
                            view,
                            selectedDate,
                            timetable,
                            minTime,
                            maxTime,
                            isLoading,
                            calendarEvents: events,
                            date: startDate,
                            onDateChange: setStartDate,
                            onViewChange: setView,
                            onSelectedDateChange: setSelectedDate,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            onTimetableChange: setTimetable,
                        }}
                    >
                        <Calendar />
                        <BottomInformation />
                    </TimetableContext.Provider>
                </div>
            }
        </ResponseWrapper>
    );
};
export default Timetable;


