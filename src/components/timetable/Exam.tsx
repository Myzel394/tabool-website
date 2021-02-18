import React, {CSSProperties, memo} from "react";
import {StudentCourseDetail} from "types";
import {Dayjs} from "dayjs";
import {Box, Grid, makeStyles, Typography} from "@material-ui/core";
import {HiClock} from "react-icons/all";
import DayJSEl from "react-dayjs";

import {ColoredBox, Information} from "../components";


export interface IExam {
    course: StudentCourseDetail;
    targetedDate: Dayjs;
    information: string | null;

    style?: CSSProperties;
}

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: theme.shape.borderRadius,
    },
}));

const Exam = ({
    course,
    information,
    targetedDate,
}: IExam) => {
    const classes = useStyles();

    return (
        <ColoredBox
            className={classes.root}
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
