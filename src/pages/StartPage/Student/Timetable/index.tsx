import React, {memo} from "react";
import {Fade} from "react-reveal";
import {Grid, useTheme} from "@material-ui/core";
import {StudentHomeworkDetail, StudentLessonDetail, StudentMaterialDetail} from "types";

import SingleLesson from "./SingleLesson";

export interface ITimetable {
    lessons: StudentLessonDetail[];
    homeworks: StudentHomeworkDetail[];
    materials: StudentMaterialDetail[];
}

const fullWith = {
    width: "100%",
};

const Timetable = ({
    lessons,
    homeworks,
    materials,
}: ITimetable) => {
    const theme = useTheme();

    return (
        <Grid container spacing={2}>
            {lessons.map((lesson, index) =>
                <Grid key={lesson.id} item style={fullWith}>
                    <Fade
                        mountOnEnter
                        left
                        duration={theme.transitions.duration.enteringScreen}
                        delay={index * 100}
                    >
                        <SingleLesson lesson={lesson} homeworks={homeworks} materials={materials} />
                    </Fade>
                </Grid>)}
        </Grid>
    );
};

export default memo(Timetable);
