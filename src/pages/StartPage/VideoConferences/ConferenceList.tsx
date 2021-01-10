import React, {memo} from "react";
import {LessonDetail} from "types";
import {Dayjs} from "dayjs";
import {Grid} from "@material-ui/core";

import Avatar from "./Avatar";
import Description from "./Description";


export interface IConferenceList {
    date: Dayjs;
    lessons: LessonDetail[];
}


const ConferenceList = ({lessons, date}: IConferenceList) => {
    return (
        <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item>
                <Grid container spacing={1} direction="row">
                    {lessons.map(lesson =>
                        <Grid key={lesson.id} item>
                            <Avatar lesson={lesson} />
                        </Grid>)}
                </Grid>
            </Grid>
            <Grid item>
                <Description date={date} secondaryText={lessons.map(lesson => lesson.lessonData.course.subject.name).join(" | ")} />
            </Grid>
        </Grid>
    );
};

export default memo(ConferenceList);
