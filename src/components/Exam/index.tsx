import React, {memo} from "react";
import {CourseDetail, Room} from "types";
import {Dayjs} from "dayjs";
import {Box, Grid, Typography} from "@material-ui/core";
import {HiClock} from "react-icons/all";
import DayJSEl from "react-dayjs";

import ColoredBox from "../ColoredBox";
import {Information} from "../index";
import {RoomIcon} from "../icons";


export interface IExam {
    course: CourseDetail;
    targetedDate: Dayjs;
    information: string;

    room?: Room;
}


const Exam = ({
    course,
    information,
    room,
    targetedDate,
}: IExam) => {
    return (
        <ColoredBox
            color={course.subject.userRelation.color}
        >
            <Box m={2}>
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    spacing={2}
                >
                    <Grid item>
                        <Grid container spacing={1} direction="column">
                            <Grid item>
                                <Typography
                                    variant="h5"
                                    component="h1"
                                    color="textPrimary"
                                >
                                    <Box fontWeight={900}>
                                        {course.subject.name}
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" color="textPrimary">
                                    {information}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Box display="flex" flexDirection="column">
                            {room &&
                                <Information
                                    getIcon={props => <RoomIcon {...props} />}
                                    text={room.place}
                                />}
                            <Information
                                getIcon={props => <HiClock {...props} />}
                                text={(
                                    <DayJSEl format="LL">
                                        {targetedDate}
                                    </DayJSEl>
                                )}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </ColoredBox>
    );
};

export default memo(Exam);
