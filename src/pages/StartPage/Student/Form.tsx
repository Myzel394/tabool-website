import React from "react";
import {Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {DatePicker} from "@material-ui/pickers";
import {Dayjs} from "dayjs";
import {useColors, useInheritedState} from "hooks";
import {FaCalendarDay, FaCalendarWeek} from "react-icons/all";

export interface FormProps {
    onChange: (data: {
        targetedDate: Dayjs;
        maxFutureDays: number;
    }) => any;
    maxFutureDays: number;
    targetedDate: Dayjs;
}

const WORK_DAYS = [
    1, 2, 3, 4, 5,
];

const Form = ({
    maxFutureDays,
    onChange,
    targetedDate,
}: FormProps) => {
    const {
        inputIconColor,
    } = useColors();
    const {t} = useTranslation();

    const [formTargetedDate, setFormTargetedDate] = useInheritedState<Dayjs>(targetedDate);
    const [formMaxFutureDays, setFormMaxFutureDays] = useInheritedState<number>(maxFutureDays);

    const dayLabel = t("Tage");

    return (
        <Box mx={2}>
            <Typography variant="body2" color="textSecondary">
                {t("Wähle Datum aus, und wie weit maximal Hausaufgaben, Events, Videokonferenzen etc. geladen werden.")}
            </Typography>
            <Box my={2}>
                <Grid container spacing={2} alignItems="center" justify="center">
                    <Grid item md={6} xs={12}>
                        <DatePicker
                            label={t("Datum")}
                            value={formTargetedDate}
                            format="LL"
                            inputVariant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaCalendarDay color={inputIconColor} />
                                    </InputAdornment>
                                ),
                            }}
                            shouldDisableDate={date => Boolean(date && !WORK_DAYS.includes(date.day()))}
                            onChange={date => {
                                if (date) {
                                    setFormTargetedDate(date);
                                    onChange({
                                        targetedDate: date,
                                        maxFutureDays: formMaxFutureDays,
                                    });
                                }
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <FormControl variant="outlined">
                            <InputLabel shrink>
                                {dayLabel}
                            </InputLabel>
                            <Select
                                fullWidth
                                startAdornment={(
                                    <InputAdornment position="start">
                                        <FaCalendarWeek color={inputIconColor} />
                                    </InputAdornment>
                                )}
                                label={dayLabel}
                                type="number"
                                value={formMaxFutureDays}
                                onChange={event => {
                                    const value = event.target.value as number;
                                    setFormMaxFutureDays(value);
                                    onChange({
                                        targetedDate: formTargetedDate,
                                        maxFutureDays: value,
                                    });
                                }}
                            >
                                <MenuItem value={5}>
                                    {t("5 Tage")}
                                </MenuItem>
                                <MenuItem value={7}>
                                    {t("1 Woche")}
                                </MenuItem>
                                <MenuItem value={14}>
                                    {t("2 Wochen")}
                                </MenuItem>
                                <MenuItem value={21}>
                                    {t("3 Wochen")}
                                </MenuItem>
                                <MenuItem value={30}>
                                    {t("1 Monat")}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Form;
