import React from "react";
import {Box, IconButton, Paper, ThemeProvider} from "@material-ui/core";
import {DatePicker} from "@material-ui/pickers";
import {ToolbarProps} from "react-big-calendar";
import {FaAngleLeft, FaAngleRight} from "react-icons/all";
import {navigate as navigationConstants} from "react-big-calendar/lib/utils/constants";
import dayjs, {Dayjs} from "dayjs";
import {findNextDate, setBeginTime, setEndTime} from "utils";

export interface IToolbar extends ToolbarProps {
    onDateChange: (newDate: Dayjs) => any;
    parentTheme: any;

    minDate?: Dayjs;
    maxDate?: Dayjs;
    disabled?: boolean;
}

const Toolbar = ({
    onNavigate,
    minDate: rawMinDate,
    maxDate: rawMaxDate,
    disabled,
    onDateChange,
    parentTheme,
    date: rawDate,
}: IToolbar) => {
    const minDate = rawMinDate && setEndTime(rawMinDate);
    const maxDate = rawMaxDate && setBeginTime(rawMaxDate);
    const date = dayjs(rawDate);
    const thisMonday = setBeginTime(
        findNextDate(
            date.subtract(4, "day"),
            1,
        ),
    );
    const thisFriday = setEndTime(
        findNextDate(
            thisMonday,
            5,
        ),
    );
    const minDateMonday = minDate && findNextDate(
        minDate.subtract(6, "day"),
        1,
    );
    const maxDateFriday = maxDate && findNextDate(
        maxDate,
        5,
    );
    const disablePrevious = disabled || minDate?.isAfter(thisMonday);
    const disableNext = disabled || maxDate?.isBefore(thisFriday);

    return (
        <ThemeProvider theme={parentTheme}>
            <Paper>
                <Box p={2}>
                    <Box flexDirection="row" display="flex" justifyContent="center">
                        <IconButton disabled={disablePrevious} onClick={() => onNavigate(navigationConstants.PREVIOUS)}>
                            <FaAngleLeft />
                        </IconButton>
                        <DatePicker
                            value={date}
                            format="LL"
                            minDate={minDateMonday}
                            maxDate={maxDateFriday}
                            inputVariant="outlined"
                            onChange={date => date && onDateChange(date)}
                        />
                        <IconButton disabled={disableNext} onClick={() => onNavigate(navigationConstants.NEXT)}>
                            <FaAngleRight />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
        </ThemeProvider>


    );
};

const proxy = ({
    ...other
}) => (props) => Toolbar({
    ...props,
    ...other,
});


export default proxy;
