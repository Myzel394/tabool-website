import React, {useCallback, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {useFetchTeacherDailyDataAPI} from "hooks/apis";
import {useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {TeacherDailyDataView, TeacherLessonDetail} from "types";
import {AxiosError} from "axios";
import {useSelector} from "react-redux";
import {getMaxFutureDays, RootState} from "state";
import {Dayjs} from "dayjs";
import {ErrorPage, LoadingOverlay, LoadingPage, ResponseWrapper} from "components";
import {Backdrop, Box, makeStyles} from "@material-ui/core";

import getTargetedDate from "../getTargetedDate";
import Content from "../Content";

import Timetable from "./Timetable";
import ActionButton from "./ActionButton";
import Homeworks from "./Homeworks";
import VideoConferences from "./VideoConferences";
import StartPageContext from "./StartPageContext";

const useClasses = makeStyles(theme => ({
    backdrop: {
        position: "fixed",
        zIndex: theme.zIndex.speedDial - 2,
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
    },
}));

const TeacherStartPage = () => {
    const classes = useClasses();
    const {t} = useTranslation();
    const fetchDailyData = useFetchTeacherDailyDataAPI();
    const queryOptions = useQueryOptions();
    const maxFutureDays = useSelector<RootState>(getMaxFutureDays) as number;

    const $onLessonSelect = useRef<(lesson: TeacherLessonDetail) => any>();
    const $onLessonAbort = useRef<() => any>();
    const [isLessonSelectMode, setIsLessonSelectMode] = useState<boolean>(false);
    const [dailyData, setDailyData] = useState<TeacherDailyDataView>();
    const [targetedDate, setTargetedDate] = useState<Dayjs>(getTargetedDate);

    const {
        isLoading,
        isFetching,
        error,
    } = useQuery<TeacherDailyDataView, AxiosError>(
        ["fetch_teacher_daily_data", maxFutureDays, targetedDate],
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

    const requestLesson = useCallback(() => new Promise<TeacherLessonDetail>((resolve, reject) => {
        $onLessonAbort.current = () => {
            // Reset mode
            setIsLessonSelectMode(false);
            // Callback
            reject();
        };
        $onLessonSelect.current = (lesson) => {
            // Reset mode
            setIsLessonSelectMode(false);
            // Callback
            resolve(lesson);
        };
        setIsLessonSelectMode(true);
    }), []);

    return (
        <ResponseWrapper<TeacherDailyDataView>
            renderLoading={() => <LoadingPage title={t("Startseite wird geladen...")} />}
            data={dailyData}
            error={error}
            isLoading={isLoading}
            getDocumentTitle={() => t("Startseite")}
            renderError={error => <ErrorPage status={error.response?.status} />}
        >
            {dailyData =>
                <Box mb={10}>
                    <StartPageContext.Provider
                        value={{
                            requestLesson,
                            dailyData,
                            isLessonSelectMode,
                            date: targetedDate,
                            onIsLessonSelectMode: setIsLessonSelectMode,
                            setDate: setTargetedDate,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            onDailyDataChange: setDailyData,
                        }}
                    >
                        <LoadingOverlay isLoading={isFetching}>
                            <Backdrop
                                open={isLessonSelectMode}
                                className={classes.backdrop}
                                onClick={() => $onLessonAbort.current?.()}
                            />
                            <Content title={t("Fächer")}>
                                <Timetable
                                    classbooks={dailyData.classbooksForLessons}
                                    lessons={dailyData.lessons}
                                    isLessonSelectMode={isLessonSelectMode}
                                    onLessonSelect={$onLessonSelect.current}
                                />
                            </Content>
                            <Content title={t("Hausaufgaben")}>
                                <Homeworks homeworks={dailyData.homeworks} />
                            </Content>
                            <Content title={t("Video-Konferenzen")}>
                                <VideoConferences classbooks={dailyData.classbookWithVideoConferences} />
                            </Content>
                        </LoadingOverlay>
                        <ActionButton
                            requestLesson={requestLesson}
                            targetedDate={targetedDate}
                            dailyData={dailyData}
                            onDailyDataChange={setDailyData}
                        />
                    </StartPageContext.Provider>
                </Box>
            }
        </ResponseWrapper>
    );
};

export default TeacherStartPage;
