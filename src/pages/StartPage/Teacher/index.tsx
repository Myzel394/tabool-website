import React, {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {TeacherDailyDataView, TeacherLessonDetail} from "types";
import {Dayjs} from "dayjs";
import Wrapper from "components/pages/FocusedPage/Wrapper";
import {ErrorPage, LoadingOverlay, LoadingPage, ResponseWrapper} from "components";
import {Box} from "@material-ui/core";
import {useSelector} from "react-redux";
import {getMaxFutureDays, RootState} from "states";

import getTargetedDate from "../getTargetedDate";

import StartPageContext from "./StartPageContext";
import StartPageView from "./StartPageView";
import useRequestLesson from "./useRequestLesson";
import useQuery from "./useQuery";

const TeacherStartPage = () => {
    const {t} = useTranslation();

    const $onLessonSelect = useRef<(lesson: TeacherLessonDetail) => any>(() => null);
    const $onLessonAbort = useRef<() => any>(() => null);
    const $oldScrollPosition = useRef<number>(0);

    const {
        requestLesson,
        isLessonSelectMode,
        selectedLesson,
        scrollBack,
    } = useRequestLesson({
        onLessonAbortRef: $onLessonAbort,
        onLessonSelectRef: $onLessonSelect,
        oldScrollPositionRef: $oldScrollPosition,
    });

    const maxFutureDays = useSelector<RootState>(getMaxFutureDays) as number;
    const [targetedDate, setTargetedDate] = useState<Dayjs>(getTargetedDate);

    const {
        isLoading,
        isFetching,
        error,
        dailyData,
        onDailyDataChange,
    } = useQuery({
        maxFutureDays,
        targetedDate,
    });

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
                <StartPageContext.Provider
                    value={{
                        requestLesson,
                        dailyData,
                        isLessonSelectMode,
                        scrollBack,
                        selectedLesson,
                        onDailyDataChange,
                        date: targetedDate,
                        setDate: setTargetedDate,
                    }}
                >
                    <LoadingOverlay isLoading={isFetching}>
                        <Wrapper>
                            <Box my={2}>
                                <StartPageView
                                    onLessonAbort={$onLessonAbort.current}
                                    onLessonSelect={$onLessonSelect.current}
                                />
                            </Box>
                        </Wrapper>
                    </LoadingOverlay>
                </StartPageContext.Provider>
            }
        </ResponseWrapper>
    );
};

export default TeacherStartPage;
