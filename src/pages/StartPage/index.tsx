import React, {useContext} from "react";
import {Box, Button, Link} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {IFetchDailyDataData, IFetchDailyDataResponse, useFetchDailyDataAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {LoadingIndicator} from "components";
import {ErrorContext} from "contexts";
import dayjs, {Dayjs} from "dayjs";
import {TimetableIcon} from "components/icons";
import Wrapper from "components/pages/FocusedPage/Wrapper";

import Title from "./Title";
import Content from "./Content";
import Timetable from "./Timetable";
import Homeworks from "./Homeworks";
import VideoConferences from "./VideoConferences";

const StartPage = () => {
    const {t} = useTranslation();
    const fetchDailyData = useFetchDailyDataAPI();
    const queryOptions = useQueryOptions();
    const {dispatch: dispatchError} = useContext(ErrorContext);

    const {
        data: dailyData,
        isLoading,
    } = useQuery<IFetchDailyDataResponse, AxiosError, IFetchDailyDataData>(
        ["fetch_daily_data"],
        () => fetchDailyData(),
        queryOptions,
    );

    if (isLoading) {
        return (
            <LoadingIndicator />
        );
    }

    if (!dailyData) {
        dispatchError({
            type: "setError",
            payload: {},
        });
        return null;
    }

    const targetedDate: Dayjs = (() => {
        let today = dayjs();
        const weekday = today.day();

        if (weekday === 0) {
            today = today.add(1, "day");
        } else if (weekday === 6) {
            today = today.add(2, "day");
        }

        return today;
    })();


    return (
        <Wrapper>
            <Box my={2}>
                <Box mb={4} mx={2}>
                    <Title />
                </Box>
                <Box mx={2} mb={6}>
                    <Content
                        title={t("Fächer")}
                        link={
                            <Link
                                component={Button}
                                underline="none"
                                startIcon={<TimetableIcon color="inherit" />}
                            >
                                {t("Zum Stundenplan")}
                            </Link>
                        }
                    >
                        <Timetable lessons={dailyData.lessons} />
                    </Content>
                </Box>
                <Box mb={6}>
                    <Content
                        disableMargin
                        title={t("Hausaufgaben")}
                    >
                        <Homeworks homeworks={dailyData.homeworks} />
                    </Content>
                </Box>
                <Box mb={6}>
                    <Content title={t("Video-Konferenzen")}>
                        <VideoConferences lessons={dailyData.videoConferenceLessons} />
                    </Content>
                </Box>
            </Box>
        </Wrapper>
    );
};

export default StartPage;
