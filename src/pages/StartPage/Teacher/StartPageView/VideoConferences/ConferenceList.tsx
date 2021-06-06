import React from "react";
import {TeacherClassbook} from "types";
import {Grid, List} from "@material-ui/core";
import {Avatar} from "modules";
import FlipMove from "react-flip-move";

import Classbook from "./Classbook";


export interface ConferenceListProps {
    classbooks: TeacherClassbook[];
}

const style = {
    width: "100%",
};

const ConferenceList = ({
    classbooks,
}: ConferenceListProps) => {
    return (
        <Grid container direction="row" spacing={2} alignItems="center" wrap="nowrap">
            <Grid item>
                <Avatar subject={classbooks[0].lesson.course.subject} />
            </Grid>
            <Grid item style={style}>
                <List>
                    <FlipMove>
                        {classbooks.map(classbook =>
                            <div key={classbook.id}>
                                <Classbook classbook={classbook} />
                            </div>)}
                    </FlipMove>
                </List>
            </Grid>
        </Grid>
    );
};

export default ConferenceList;
