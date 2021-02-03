import React, {CSSProperties, memo, useMemo} from "react";
import {CourseDetail, Room} from "types";
import {Dayjs} from "dayjs";
import {Box, Grid, Typography, useTheme} from "@material-ui/core";
import {HiClock} from "react-icons/all";
import DayJSEl from "react-dayjs";

import {RoomIcon} from "../../icons";
import {ColoredBox, Information} from "../../components";


export interface IExam {
    course: CourseDetail;
    targetedDate: Dayjs;
    information: string | null;

    room?: Room;
    style?: CSSProperties;
}

const Exam = ({
    course,
    information,
    room,
    targetedDate,
    style,
}: IExam) => {
    const theme = useTheme();
    const wrapperStyle = useMemo(() => ({
        ...style,
        borderRadius: theme.shape.borderRadius,
    }), [theme.shape.borderRadius, style]);

    return (
        <ColoredBox
            style={wrapperStyle}
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
