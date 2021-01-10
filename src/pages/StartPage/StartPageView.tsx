import React from "react";
import {Box, Button, Link, useTheme} from "@material-ui/core";
import Wrapper from "components/pages/FocusedPage/Wrapper";
import {useTranslation} from "react-i18next";
import {TimetableIcon} from "components";
import {Fade, Zoom} from "react-reveal";

import Title from "./Title";
import Content from "./Content";
import Timetable from "./Timetable";
import Homeworks from "./Homeworks";
import VideoConferences from "./VideoConferences";
import Form from "./Form";
import Modifications from "./Modifications";


const StartPageView = () => {
    const {t} = useTranslation();
    const theme = useTheme();

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
                        <Timetable />
                    </Content>
                </Box>
                <Box mb={6} mx={2}>
                    <Content title={t("Veränderungen")}>
                        <Modifications />
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
                                <Homeworks />
                            </div>
                        </Zoom>
                    </Content>
                </Box>
                <Box mb={6} mx={2}>
                    <Content title={t("Video-Konferenzen")}>
                        <VideoConferences />
                    </Content>
                </Box>
                <Box mx={2}>
                    <Fade duration={theme.transitions.duration.complex}>
                        {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
                        <div>
                            <Form />
                        </div>
                    </Fade>
                </Box>
            </Box>
        </Wrapper>
    );
};

export default StartPageView;
