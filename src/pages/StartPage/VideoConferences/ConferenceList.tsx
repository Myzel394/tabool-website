import React from "react";
import {LessonDetail} from "types";
import {Dayjs} from "dayjs";
import {Grid} from "@material-ui/core";
import {AvatarGroup} from "@material-ui/lab";

import Avatar from "./Avatar";
import Description from "./Description";


export interface IConferenceList {
    date: Dayjs;
    lessons: LessonDetail[];
}


const ConferenceList = ({lessons, date}: IConferenceList) => {
    return (
        <Grid container direction="row" spacing={2} alignItems="center" wrap="nowrap">
            <Grid item>
                <AvatarGroup max={3}>
                    {lessons.map(lesson =>
                        <Avatar key={lesson.id} lesson={lesson} />)}
                </AvatarGroup>
            </Grid>
            <Grid item>
                <Description date={date} secondaryText={lessons.map(lesson => lesson.lessonData.course.subject.name).join(" | ")} />
            </Grid>
        </Grid>
    );
};

export default ConferenceList;
