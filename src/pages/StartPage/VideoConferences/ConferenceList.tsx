import React from "react";
import {Dayjs} from "dayjs";
import {Grid} from "@material-ui/core";
import {AvatarGroup} from "@material-ui/lab";
import {LessonRelatedDetail} from "types";

import Avatar from "../Avatar";

import Description from "./Description";


export interface IConferenceList {
    date: Dayjs;
    lessons: LessonRelatedDetail[];
}

const style = {
    width: "100%",
};

const ConferenceList = ({lessons, date}: IConferenceList) => {
    return (
        <Grid container direction="row" spacing={2} alignItems="center" wrap="nowrap">
            <Grid item>
                <AvatarGroup max={3}>
                    {lessons.map(lesson =>
                        <Avatar key={lesson.id} lesson={lesson} />)}
                </AvatarGroup>
            </Grid>
            <Grid item style={style}>
                <Description
                    date={date}
                    secondaryText={lessons.map(lesson => lesson.course.subject.name).join(" | ")}
                />
            </Grid>
        </Grid>
    );
};

export default ConferenceList;
