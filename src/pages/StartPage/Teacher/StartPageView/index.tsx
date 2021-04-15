import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import {Backdrop, Box, makeStyles} from "@material-ui/core";

import Content from "../../Content";
import StartPageContext from "../StartPageContext";
import Title from "../../Title";
import Form from "../../Form";

import Timetable from "./Timetable";
import VideoConferences from "./VideoConferences";
import Homeworks from "./Homeworks";
import Submissions from "./Submissions";
import Materials from "./Materials";

const useClasses = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.speedDial - 2,
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
    },
}));

const StartPageView = ({onLessonSelect, onLessonAbort}) => {
    const classes = useClasses();
    const {
        isLessonSelectMode,
        date,
        setDate,
    } = useContext(StartPageContext);
    const {t} = useTranslation();

    return (
        <>
            <Box mb={4} mx={2}>
                <Title />
            </Box>
            <Content title={t("Fächer")}>
                <Backdrop
                    open={isLessonSelectMode}
                    className={classes.backdrop}
                    onClick={onLessonAbort}
                />
                <Timetable onLessonSelect={onLessonSelect} />
            </Content>
            <Content title={t("Video-Konferenzen")}>
                <VideoConferences />
            </Content>
            <Content title={t("Hausaufgaben")}>
                <Homeworks />
            </Content>
            <Content title={t("Einsendungen")}>
                <Submissions />
            </Content>
            <Content title={t("Materialien")}>
                <Materials />
            </Content>
            <Box mx={2} mt={2}>
                <Form
                    date={date}
                    onDateChange={setDate}
                />
            </Box>
        </>
    );
};

export default StartPageView;
