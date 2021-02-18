import React from "react";
import {Box, useTheme} from "@material-ui/core";
import Wrapper from "components/pages/FocusedPage/Wrapper";
import {useTranslation} from "react-i18next";
import {Fade, Zoom} from "react-reveal";
import {StudentDailyDataView} from "types";
import {Dayjs} from "dayjs";
import update from "immutability-helper";

import {LoadingOverlay} from "../../../components";

import Title from "./Title";
import Content from "./Content";
import Timetable from "./Timetable";
import Homeworks from "./Homeworks";
import VideoConferences from "./VideoConferences";
import Form from "./Form";
import Modifications from "./Modifications";
import Exams from "./Exams";


export interface IStartPageView {
    dailyData: StudentDailyDataView;
    onDailyDataChange: (newData: StudentDailyDataView) => any;

    targetedDate: Dayjs;
    onTargetedDateChange: (newDate: Dayjs) => any;

    maxFutureDays: number;
    onMaxFutureDaysChange: (newMaxFutureDays: number) => any;

    isLoading: boolean;
}


const StartPageView = ({
    dailyData,
    isLoading,
    maxFutureDays,
    onDailyDataChange,
    onMaxFutureDaysChange,
    onTargetedDateChange,
    targetedDate,
}: IStartPageView) => {
    const {t} = useTranslation();
    const theme = useTheme();
    const {
        modifications,
        homeworks,
        classbookWithVideoConferences,
        lessons,
        exams,
        materials,
    } = dailyData;

    return (
        <LoadingOverlay isLoading={isLoading}>
            <Wrapper>
                <Box my={2}>
                    <Box mb={4} mx={2}>
                        <Title />
                    </Box>
                    <Box mx={2} mb={6}>
                        <Content
                            title={t("Fächer")}
                        >
                            <Timetable lessons={lessons} homeworks={homeworks} materials={materials} />
                        </Content>
                    </Box>
                    <Box mb={6} mx={2}>
                        <Content title={t("Veränderungen")}>
                            <Modifications modifications={modifications} />
                        </Content>
                    </Box>
                    <Box mb={6}>
                        <Content
                            disableMargin
                            title={t("Hausaufgaben")}
                        >
                            <Zoom mountOnEnter duration={theme.transitions.duration.enteringScreen}>
                                {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
                                <div>
                                    <Homeworks
                                        homeworks={homeworks}
                                        onChange={newHomeworks => onDailyDataChange(update(dailyData, {
                                            homeworks: {
                                                $set: newHomeworks,
                                            },
                                        }))}
                                    />
                                </div>
                            </Zoom>
                        </Content>
                    </Box>
                    <Box mb={6} mx={2}>
                        <Content title={t("Video-Konferenzen")}>
                            <VideoConferences classbooks={classbookWithVideoConferences} />
                        </Content>
                    </Box>
                    <Box mb={6} mx={2}>
                        <Content title={t("Arbeiten")}>
                            <Exams exams={exams} />
                        </Content>
                    </Box>
                    <Box mx={2}>
                        <Fade mountOnEnter duration={theme.transitions.duration.complex}>
                            {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
                            <div>
                                <Form
                                    maxFutureDays={maxFutureDays}
                                    targetedDate={targetedDate}
                                    onChange={({
                                        targetedDate,
                                        maxFutureDays,
                                    }) => {
                                        onTargetedDateChange(targetedDate);
                                        onMaxFutureDaysChange(maxFutureDays);
                                    }}
                                />
                            </div>
                        </Fade>
                    </Box>
                </Box>
            </Wrapper>
        </LoadingOverlay>
    );
};

export default StartPageView;
