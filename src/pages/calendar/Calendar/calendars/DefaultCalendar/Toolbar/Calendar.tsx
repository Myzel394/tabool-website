import React, {memo, useContext} from "react";
import {Grid, Typography} from "@material-ui/core";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {useTranslation} from "react-i18next";
import dayjs, {Dayjs} from "dayjs";

import CalendarContext from "../../../../CalendarContext";

export interface ICalendar {
    onChange?: (value: Dayjs) => any;
}

const WEEK_DAYS = [1, 2, 3, 4, 5];

const Calendar = ({onChange}: ICalendar) => {
    const {onDateChange, date} = useContext(CalendarContext);
    const {t} = useTranslation();
    const {earliestDateAvailable, latestDateAvailable} = useContext(CalendarContext);

    return (
        <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item spacing={2}>
                <Typography variant="h5" component="h1" align="center">
                    {t("Springe zu einem Tag")}
                </Typography>
            </Grid>
            <Grid item>
                <KeyboardDatePicker
                    disableToolbar
                    variant="static"
                    format="L"
                    value={date.toDate()}
                    minDate={earliestDateAvailable?.toDate()}
                    maxDate={latestDateAvailable?.toDate()}
                    shouldDisableDate={dateInstance => (dateInstance ? !WEEK_DAYS.includes(dateInstance.day()) : true)}
                    onChange={newValue => {
                        if (newValue) {
                            const val = dayjs(newValue);
                            onDateChange(val);

                            if (onChange) {
                                onChange(val);
                            }
                        }
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default memo(Calendar);
