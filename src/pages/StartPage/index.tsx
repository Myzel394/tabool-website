import React, {useContext, useState} from "react";
import {usePersistentStorage, useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {IFetchDailyDataData, IFetchDailyDataResponse, useFetchDailyDataAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {ErrorContext} from "contexts";
import dayjs, {Dayjs} from "dayjs";
import {DailyData} from "types";

import StartPageContext from "./StartPageContext";
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
    const fetchDailyData = useFetchDailyDataAPI();
    const queryOptions = useQueryOptions();
    const {dispatch: dispatchError} = useContext(ErrorContext);

    const [dailyData, setDailyData] = useState<DailyData>();
    const [targetedDate, setTargetedDate] = useState<Dayjs>(getTargetedDate);
    const [maxFutureDays, setMaxFutureDays] = usePersistentStorage<number>(7, "start_page:max_future_days");

    const {
        data,
        isLoading,
        isFetching,
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

    if (!data) {
        dispatchError({
            type: "setError",
            payload: {},
        });
        return null;
    }

    return (
        <StartPageContext.Provider
            value={{
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore: DailyData checked with data guard.
                dailyData,
                setDailyData,
                maxFutureDays,
                setMaxFutureDays,
                setTargetedDate,
                targetedDate,
                isLoading: isFetching,
            }}
        >
            <StartPageView />
        </StartPageContext.Provider>
    );
};

export default StartPage;
