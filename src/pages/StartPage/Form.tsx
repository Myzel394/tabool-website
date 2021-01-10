import React, {memo, useContext} from "react";
import {Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {DatePicker} from "@material-ui/pickers";
import {Dayjs} from "dayjs";
import {useColors, useInheritedState} from "hooks";
import {FaCalendarDay} from "react-icons/all";
import {LoadingOverlay} from "components";

import StartPageContext from "./StartPageContext";


const Form = () => {
    const {
        inputIconColor,
    } = useColors();
    const {t} = useTranslation();
    const {
        targetedDate,
        setTargetedDate,
        maxFutureDays,
        setMaxFutureDays,
        isLoading,
        dailyData,
    } = useContext(StartPageContext);

    const [formTargetedDate, setFormTargetedDate] = useInheritedState<Dayjs>(targetedDate);
    const [formMaxFutureDays, setFormMaxFutureDays] = useInheritedState<number>(maxFutureDays);

    const dayLabel = t("Tage");
    const {earliestDateAvailable, latestDateAvailable} = dailyData;

    return (
        <>
            <Typography variant="body2" color="textSecondary">
                {t("Wähle Datum aus, und wie weit maximal Hausaufgaben, Events, Videokonferenzen etc. geladen werden.")}
            </Typography>
            <LoadingOverlay isLoading={isLoading}>
                <Box my={2}>
                    <Grid container spacing={2} alignItems="center" justify="center">
                        <Grid item md={6} xs={12}>
                            <DatePicker
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
                                minDate={earliestDateAvailable}
                                maxDate={latestDateAvailable}
                                onChange={date => date && setFormTargetedDate(date)}
                                onBlur={() => setTargetedDate(formTargetedDate)}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl variant="outlined">
                                <InputLabel shrink>
                                    {dayLabel}
                                </InputLabel>
                                <Select
                                    fullWidth
                                    label={dayLabel}
                                    type="number"
                                    value={formMaxFutureDays}
                                    onChange={event => {
                                        const value = event.target.value as number;
                                        setFormMaxFutureDays(value);
                                    }}
                                    onBlur={() => setMaxFutureDays(formMaxFutureDays)}
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
            </LoadingOverlay>
        </>
    );
};

export default memo(Form);
