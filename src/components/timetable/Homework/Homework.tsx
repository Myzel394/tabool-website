import React, {memo} from "react";
import {Dayjs} from "dayjs";
import {Subject} from "types";
import {Box, Grid, Typography} from "@material-ui/core";
import DayJSEl from "react-dayjs";
import {FaCheckCircle, FaExclamationTriangle, HiBan, MdAccessTime} from "react-icons/all";

import ColoredBox from "../../ColoredBox";

import Action from "./Action";

export interface IHomework {
    creationDate: Dayjs;
    subject: Subject;
    information: string;

    dueDate?: Dayjs;
    completed?: boolean;
    ignore?: boolean;
}

const TIME_FORMAT = "ll";

const Homework = ({completed, creationDate, dueDate, ignore, information, subject}: IHomework) => {
    return (
        <ColoredBox color={subject.userRelation.color}>
            <Grid container direction="column" justify="space-between" spacing={4}>
                <Grid item>
                    <Typography
                        variant="h5"
                        component="h1"
                        color="textPrimary"
                    >
                        {subject.name}
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                        {information}
                    </Typography>
                </Grid>
                <Grid item>
                    <Box flexDirection="row" display="flex" alignItems="center">
                        <Box display="flex" flexDirection="column">
                            {dueDate && (
                                <Typography variant="body2" color="textSecondary">
                                    <FaExclamationTriangle />
                                    <DayJSEl format={TIME_FORMAT}>
                                        {dueDate}
                                    </DayJSEl>
                                </Typography>
                            )}
                            <Typography variant="body2" color="textSecondary">
                                <MdAccessTime />
                                <DayJSEl format={TIME_FORMAT}>
                                    {creationDate}
                                </DayJSEl>
                            </Typography>
                        </Box>
                        <Box display="flex" flexDirection="row">
                            <Action icon={<FaCheckCircle />} />
                            <Action icon={<HiBan />} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ColoredBox>
    );
};

Homework.defaultProps = {
    completed: false,
    ignore: false,
};

export default memo(Homework);
