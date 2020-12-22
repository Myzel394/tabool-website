import React from "react";
import {Box, Button, IconButton, Paper} from "@material-ui/core";
import {ToolbarProps} from "react-big-calendar";
import {FaAngleLeft, FaAngleRight} from "react-icons/all";
import {navigate as navigationConstants} from "react-big-calendar/lib/utils/constants";
import dayjs, {Dayjs} from "dayjs";
import {findNextDate, setBeginTime, setEndTime} from "utils";

export interface IToolbar extends ToolbarProps {
    minDate: Dayjs;
    maxDate: Dayjs;
    onDateChange: (newDate: Dayjs) => any;
}

const Toolbar = ({
    label,
    onNavigate,
    date: rawDate,
    minDate,
    maxDate,
    onDateChange,
}: IToolbar) => {
    const date = dayjs(rawDate);
    const thisMonday = setBeginTime(
        findNextDate(
            date.subtract(6, "day"),
            1,
        ),
    );
    const thisFriday = setEndTime(
        findNextDate(
            thisMonday,
            5,
        ),
    );
    const disablePrevious = minDate.isAfter(thisMonday);
    const disableNext = maxDate.isBefore(thisFriday);

    return (
        <Paper>
            <Box p={2}>
                <Box flexDirection="row" display="flex" justifyContent="center">
                    <IconButton disabled={disablePrevious} onClick={() => onNavigate(navigationConstants.PREVIOUS)}>
                        <FaAngleLeft />
                    </IconButton>
                    <Button color="default" onClick={() => onDateChange(dayjs())}>
                        {label}
                    </Button>
                    <IconButton disabled={disableNext} onClick={() => onNavigate(navigationConstants.NEXT)}>
                        <FaAngleRight />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
};

const proxy = ({
    ...other
}) => (props) => Toolbar({
    ...props,
    ...other,
});


export default proxy;
