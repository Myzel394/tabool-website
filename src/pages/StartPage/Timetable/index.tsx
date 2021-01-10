import React, {useContext} from "react";
import {Fade} from "react-reveal";
import {Grid, useTheme} from "@material-ui/core";

import StartPageContext from "../StartPageContext";

import SingleLesson from "./SingleLesson";

const fullWith = {
    width: "100%",
};

const Timetable = () => {
    const {
        dailyData: {
            lessons,
        },
    } = useContext(StartPageContext);
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

export default Timetable;
