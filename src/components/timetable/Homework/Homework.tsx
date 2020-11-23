import React, {memo, useMemo} from "react";
import {Dayjs} from "dayjs";
import {Subject} from "types";
import {Box, Grid, Typography, useTheme} from "@material-ui/core";
import DayJSEl from "react-dayjs";
import {FaCheckCircle, FaExclamationTriangle, HiBan, HiClock} from "react-icons/all";

import ColoredBox from "../../ColoredBox";
import Information from "../../Information";

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
const MARGIN = 2;

const Homework = ({completed, creationDate, dueDate, ignore, information, subject}: IHomework) => {
    const theme = useTheme();
    const style = useMemo(() => ({
        borderRadius: theme.shape.borderRadius,
    }), [theme.shape.borderRadius]);

    return (
        <ColoredBox style={style} color={subject.userRelation.color}>
            <Box mx={MARGIN} mt={MARGIN}>
                <Grid container direction="column" justify="space-between" spacing={4}>
                    <Grid item>
                        <Grid container spacing={1} direction="column">
                            <Grid item>
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    color="textPrimary"

                                >
                                    <Box fontWeight={900}>
                                        {subject.name}
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
                        <Box flexDirection="row" display="flex" alignItems="flex-end" justifyContent="space-between">
                            <Box display="flex" flexDirection="column">
                                {dueDate && (
                                    <Information
                                        getIcon={props => <FaExclamationTriangle {...props} />}
                                        text={(
                                            <DayJSEl format={TIME_FORMAT}>
                                                {dueDate}
                                            </DayJSEl>
                                        )}
                                    />
                                )}
                                <Information
                                    getIcon={props => <HiClock {...props} />}
                                    text={(
                                        <DayJSEl format={TIME_FORMAT}>
                                            {creationDate}
                                        </DayJSEl>
                                    )}
                                />
                            </Box>
                            <Box display="flex" flexDirection="row">
                                <Action icon={<FaCheckCircle />} />
                                <Action icon={<HiBan />} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </ColoredBox>
    );
};

Homework.defaultProps = {
    completed: false,
    ignore: false,
};

export default memo(Homework);
