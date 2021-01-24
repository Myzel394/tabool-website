import React from "react";
import {Box, useTheme} from "@material-ui/core";
import Wrapper from "components/pages/FocusedPage/Wrapper";
import {useTranslation} from "react-i18next";
import {Fade, Zoom} from "react-reveal";
import {DailyData} from "types";
import {Dayjs} from "dayjs";
import update from "immutability-helper";

import Title from "./Title";
import Content from "./Content";
import Timetable from "./Timetable";
import Homeworks from "./Homeworks";
import VideoConferences from "./VideoConferences";
import Form from "./Form";
import Modifications from "./Modifications";
import Exams from "./Exams";


export interface IStartPageView {
    dailyData: DailyData;
    onDailyDataChange: (newData: DailyData) => any;

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
        videoConferenceLessons,
        lessons,
        latestDateAvailable,
        earliestDateAvailable,
        exams,
        materials,
    } = dailyData;

    return (
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
                        <Zoom duration={theme.transitions.duration.enteringScreen}>
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
                        <VideoConferences lessons={videoConferenceLessons} />
                    </Content>
                </Box>
                <Box mb={6} mx={2}>
                    <Content title={t("Arbeiten")}>
                        <Exams exams={exams} />
                    </Content>
                </Box>
                <Box mx={2}>
                    <Fade duration={theme.transitions.duration.complex}>
                        {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
                        <div>
                            <Form
                                maxFutureDays={maxFutureDays}
                                targetedDate={targetedDate}
                                isLoading={isLoading}
                                earliestDateAvailable={earliestDateAvailable}
                                latestDateAvailable={latestDateAvailable}
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
    );
};

export default StartPageView;
