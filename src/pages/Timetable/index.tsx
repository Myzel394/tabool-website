import React, {useState} from "react";
import {useFetchStudentWeekAPI} from "hooks/apis";
import {useQuery} from "react-query";
import {StudentWeekView} from "types";
import {AxiosError} from "axios";
import {useQueryOptions} from "hooks";
import dayjs, {Dayjs} from "dayjs";
import {LoadingPage, ResponseWrapper} from "components";
import {useTranslation} from "react-i18next";
import {useTheme} from "@material-ui/core";
import tinycolor from "tinycolor2";

import TimetableContext, {ITimetableContext} from "./TimetableContext";
import Calendar from "./Calendar";
import BottomInformation from "./BottomInformation";


const Timetable = () => {
    const theme = useTheme();
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchWeek = useFetchStudentWeekAPI();

    const [view, setView] = useState<ITimetableContext["view"]>("month");
    const [startDate, setStartDate] = useState<Dayjs>(dayjs);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

    const endDate = startDate.add(30, "day");

    const {
        data,
        isLoading,
        error,
    } = useQuery<StudentWeekView, AxiosError>(
        "fetch_week",
        () => fetchWeek({
            startDate,
            endDate,
        }),
        queryOptions,
    );

    const selectedColor = tinycolor(theme.palette.text.primary)
        .setAlpha(0.1)
        .toString();

    return (
        <ResponseWrapper<StudentWeekView>
            isLoading={isLoading}
            data={data}
            error={error}
            getDocumentTitle={() => t("Stundenplan ({{startDate}} - {{endDate}})", {
                startDate: startDate.format("l"),
                endDate: endDate.format("l"),
            })}
            renderLoading={() => <LoadingPage title={t("Stundenplan wird geladen...")} />}
        >
            {timetable =>
                <TimetableContext.Provider
                    value={{
                        ...timetable,
                        view,
                        selectedColor,
                        selectedDate,
                        date: startDate,
                        onDateChange: setStartDate,
                        onViewChange: setView,
                        onSelectedDateChange: setSelectedDate,
                    }}
                >
                    <Calendar />
                    <BottomInformation />
                </TimetableContext.Provider>
            }
        </ResponseWrapper>
    );
};
export default Timetable;


