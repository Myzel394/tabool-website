import React, {useRef, useState} from "react";
import {StudentWeekView} from "types";
import {LoadingPage, ResponseWrapper} from "components";
import {useTranslation} from "react-i18next";
import {usePersistentStorage} from "hooks";

import TimetableContext, {ITimetableContext} from "./TimetableContext";
import Calendar from "./Calendar";
import BottomInformation from "./BottomInformation";
import {useTimetableDays, useTimetableQuery, useTimetableSwipe} from "./hooks";

const Timetable = () => {
    const {t} = useTranslation();

    const [view, setView] = usePersistentStorage<ITimetableContext["view"]>("month", "timetable_view");
    const [timetable, setTimetable] = useState<StudentWeekView>();

    const $isInitialLoading = useRef<boolean>(true);

    const {
        setSelectedDate,
        queryStartDate,
        queryEndDate,
        startDate,
        selectedDate,
        setStartDate,
    } = useTimetableDays({
        view,
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


