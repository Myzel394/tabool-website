import React from "react";
import {TeacherClassbook} from "types";
import {Grid, List, ListItem, ListItemText} from "@material-ui/core";
import {Avatar, LinkTitleGrabber} from "components";
import {buildPath, lazyDatetime} from "utils";


export interface IConferenceList {
    classbooks: TeacherClassbook[];
}

const style = {
    width: "100%",
};

const ConferenceList = ({
    classbooks,
}: IConferenceList) => {
    return (
        <Grid container direction="row" spacing={2} alignItems="center" wrap="nowrap">
            <Grid item>
                <Avatar subject={classbooks[0].lesson.course.subject} />
            </Grid>
            <Grid item style={style}>
                <List>
                    {classbooks.map(classbook =>
                        <ListItem
                            key={classbook.id}
                            button
                            component="a"
                            href={buildPath("/timetable", undefined, {
                                date: lazyDatetime(classbook.lessonDate, "date"),
                            })}
                        >
                            <ListItemText
                                primary={
                                    <LinkTitleGrabber>
                                        {classbook.videoConferenceLink}
                                    </LinkTitleGrabber>
                                }
                                secondary={classbook.lessonDate.format("LL")}
                            />
                        </ListItem>)}
                </List>
            </Grid>
        </Grid>
    );
};

export default ConferenceList;
