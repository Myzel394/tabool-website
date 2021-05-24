import React from "react";
import {Dayjs} from "dayjs";
import {Grid} from "@material-ui/core";
import {AvatarGroup} from "@material-ui/lab";
import {StudentLessonDetail} from "types";
import {Avatar} from "components";

import Description from "./Description";


export interface ConferenceListProps {
    date: Dayjs;
    lessons: StudentLessonDetail[];
}

const style = {
    width: "100%",
};

const ConferenceList = ({lessons, date}: ConferenceListProps) => {
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
