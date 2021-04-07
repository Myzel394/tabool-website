import React from "react";
import {Box, Collapse, Grid, useTheme} from "@material-ui/core";
import {Fade} from "react-reveal";
import {TeacherClassbook, TeacherLessonDetail} from "types";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";

import Lesson from "./Lesson";

export interface ITimetable {
    lessons: TeacherLessonDetail[];
    classbooks: TeacherClassbook[];
    isLessonSelectMode: boolean;
    onLessonSelect?: (lesson: TeacherLessonDetail) => any;
}

const fullWidth = {
    width: "100%",
};

const Timetable = ({
    lessons,
    classbooks,
    isLessonSelectMode,
    onLessonSelect,
}: ITimetable) => {
    const {t} = useTranslation();
    const theme = useTheme();
    const style = {
        zIndex: theme.zIndex.speedDial - 1,
    };

    return (
        <>
            <Grid
                container
                spacing={2}
                style={isLessonSelectMode ? style : undefined}
            >
                {lessons.map((lesson, index) =>
                    <Grid
                        key={lesson.id}
                        item
                        style={fullWidth}
                    >
                        <Fade
                            mountOnEnter
                            left
                            duration={theme.transitions.duration.enteringScreen}
                            delay={index * 100}
                        >
                            <Lesson
                                hasVideoConference={classbooks.some(classbook => classbook.videoConferenceLink && classbook.lesson.id === lesson.id)}
                                lesson={lesson}
                                isLessonSelectMode={isLessonSelectMode}
                                onLessonSelect={onLessonSelect}
                            />
                        </Fade>
                    </Grid>)}
            </Grid>
            <Box mt={2} style={style}>
                <Collapse in={isLessonSelectMode}>
                    <Alert severity="info">
                        {t("Wähle eine Stunde aus")}
                    </Alert>
                </Collapse>
            </Box>
        </>
    );
};
export default Timetable;

