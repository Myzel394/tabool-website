import React from "react";
import {LessonDetail} from "types";
import {Grid} from "@material-ui/core";

import SingleLesson from "./SingleLesson";

export interface ICalendar {
    lessons: LessonDetail[];
}

const fullWith = {
    width: "100%",
};

const Timetable = ({
    lessons,
}: ICalendar) => {
    return (
        <Grid container spacing={2}>
            {lessons.map(lesson =>
                <Grid key={lesson.id} item style={fullWith}>
                    <SingleLesson lesson={lesson} />
                </Grid>)}
        </Grid>
    );
};

export default Timetable;
