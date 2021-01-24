import React, {useContext, useState} from "react";
import {useQueryOptions, useUserPreferences} from "hooks";
import {useQuery} from "react-query";
import {IFetchDailyDataData, IFetchDailyDataResponse, useFetchDailyDataAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {ErrorContext} from "contexts";
import dayjs, {Dayjs} from "dayjs";
import {DailyData} from "types";

import StartPageView from "./StartPageView";
import SkeletonView from "./SkeletonView";
import NotLoaded from "./NotLoaded";


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
    const fetchDailyData = useFetchDailyDataAPI();
    const queryOptions = useQueryOptions();
    const {dispatch: dispatchError} = useContext(ErrorContext);
    const {
        state,
        update,
    } = useUserPreferences();

    const [dailyData, setDailyData] = useState<DailyData>();
    const [targetedDate, setTargetedDate] = useState<Dayjs>(getTargetedDate);

    const maxFutureDays = state?.global?.startPageMaxFutureDays ?? 7;
    const setMaxFutureDays = update.global.setStartPageMaxFutureDays;

    const {
        data,
        isLoading,
        isFetching,
        error,
    } = useQuery<IFetchDailyDataResponse, AxiosError, IFetchDailyDataData>(
        ["fetch_daily_data", maxFutureDays, targetedDate],
        () => fetchDailyData({
            maxFutureDays,
            date: targetedDate,
        }),
        {
            ...queryOptions,
            onSuccess: setDailyData,
            keepPreviousData: true,
        },
    );

    if (isLoading) {
        return (
            <SkeletonView />
        );
    }

    if (error?.response?.status === 503) {
        return (
            <NotLoaded />
        );
    }

    if (!data) {
        dispatchError({
            type: "setError",
            payload: {},
        });
        return null;
    }

    return (
        <StartPageView
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore: Data guard (l. 59) ensures dailyData is set
            dailyData={dailyData}
            maxFutureDays={maxFutureDays}
            targetedDate={targetedDate}
            isLoading={isFetching}
            onDailyDataChange={setDailyData}
            onMaxFutureDaysChange={setMaxFutureDays}
            onTargetedDateChange={setTargetedDate}
        />
    );
};

export default StartPage;
