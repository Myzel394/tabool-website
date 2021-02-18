import React, {useState} from "react";
import {usePreferences, useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {IFetchStudentDailyDataData, useFetchStudentDailyDataAPI} from "hooks/apis";
import {AxiosError} from "axios";
import dayjs, {Dayjs} from "dayjs";
import {StudentDailyDataView} from "types";
import {ErrorPage} from "components";

import StartPageView from "./StartPageView";
import SkeletonView from "./SkeletonView";


const getTargetedDate = (): Dayjs => {
    let today = dayjs();
    const weekday = today.day();

    if (weekday === 0) {
        today = today.add(1, "day");
    } else if (weekday === 6) {
        today = today.add(2, "day");
    }

    return today;
};

const StartPage = () => {
    const fetchDailyData = useFetchStudentDailyDataAPI();
    const queryOptions = useQueryOptions();
    const {
        state,
        update,
    } = usePreferences();

    const [dailyData, setDailyData] = useState<StudentDailyDataView>();
    const [targetedDate, setTargetedDate] = useState<Dayjs>(getTargetedDate);

    const maxFutureDays = state?.global?.startPageMaxFutureDays ?? 7;
    const setMaxFutureDays = update.global.setStartPageMaxFutureDays;

    const {
        isLoading,
        isFetching,
        error,
    } = useQuery<StudentDailyDataView, AxiosError, IFetchStudentDailyDataData>(
        ["fetch_daily_data", maxFutureDays, targetedDate],
        () => fetchDailyData({
            maxFutureDays,
            date: targetedDate,
        }),
        {
            ...queryOptions,
            refetchOnWindowFocus: false,
            onSuccess: setDailyData,
            keepPreviousData: true,
        },
    );

    if (isLoading) {
        return (
            <SkeletonView />
        );
    }

    if (error && !dailyData) {
        return (
            <ErrorPage
                status={error?.response?.status}
            />
        );
    }

    if (!dailyData) {
        return (
            <SkeletonView />
        );
    }

    return (
        <StartPageView
            dailyData={dailyData}
            maxFutureDays={maxFutureDays}
            targetedDate={targetedDate}
            isLoading={isFetching}
            onDailyDataChange={setDailyData}
            onMaxFutureDaysChange={async value => {
                if (value !== state.global?.startPageMaxFutureDays) {
                    setMaxFutureDays(value);
                }
            }}
            onTargetedDateChange={async value => setTargetedDate(value)}
        />
    );
};

export default StartPage;
