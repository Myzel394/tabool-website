import React, {useEffect, useState} from "react";
import {useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {useFetchStudentDailyDataAPI} from "hooks/apis";
import {AxiosError} from "axios";
import dayjs, {Dayjs} from "dayjs";
import {StudentDailyDataView} from "types";
import {ErrorPage, ResponseWrapper} from "components";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getMaxFutureDays, RootState, setStartPageMaxFutureDays} from "state";

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
    const {t} = useTranslation();
    const fetchDailyData = useFetchStudentDailyDataAPI();
    const queryOptions = useQueryOptions();
    const dispatch = useDispatch();
    const maxFutureDays = useSelector<RootState>(getMaxFutureDays) as number;

    const [dailyData, setDailyData] = useState<StudentDailyDataView>();
    const [targetedDate, setTargetedDate] = useState<Dayjs>(getTargetedDate);

    const setMaxFutureDays = (value: number) => dispatch(setStartPageMaxFutureDays(value));

    const {
        isLoading,
        isFetching,
        error,
    } = useQuery<StudentDailyDataView, AxiosError>(
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

    useEffect(() => {
        if (isLoading) {
            document.title = t("Startseite wird geladen...");
        }
    }, [isLoading, t]);

    return (
        <ResponseWrapper<StudentDailyDataView>
            isLoading={isLoading}
            renderLoading={() => <SkeletonView />}
            renderError={error => <ErrorPage status={error.response?.status} />}
            getDocumentTitle={() => t("Startseite")}
            error={error}
            data={dailyData}
        >
            {dailyData =>
                <StartPageView
                    dailyData={dailyData}
                    maxFutureDays={maxFutureDays}
                    targetedDate={targetedDate}
                    isLoading={isFetching}
                    onDailyDataChange={setDailyData}
                    onMaxFutureDaysChange={async value => {
                        if (value !== maxFutureDays) {
                            setMaxFutureDays(value);
                        }
                    }}
                    onTargetedDateChange={async value => setTargetedDate(value)}
                />
            }
        </ResponseWrapper>
    );
};

export default StartPage;
