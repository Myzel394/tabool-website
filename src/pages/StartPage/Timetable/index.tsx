import React, {memo} from "react";
import {Fade} from "react-reveal";
import {Grid, useTheme} from "@material-ui/core";
import {LessonDetail} from "types";

import SingleLesson from "./SingleLesson";

export interface ITimetable {
    lessons: LessonDetail[];
}

const fullWith = {
    width: "100%",
};

const Timetable = ({
    lessons,
}: ITimetable) => {
    const theme = useTheme();

    return (
        <Grid container spacing={2}>
            {lessons.map((lesson, index) =>
                <Grid key={lesson.id} item style={fullWith}>
                    <Fade left duration={theme.transitions.duration.enteringScreen} delay={index * 100}>
                        <SingleLesson lesson={lesson} />
                    </Fade>
                </Grid>)}
        </Grid>
    );
};

export default memo(Timetable);
