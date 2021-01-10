import React from "react";
import {Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {DatePicker} from "@material-ui/pickers";
import {Dayjs} from "dayjs";
import {useColors, useInheritedState} from "hooks";
import {FaCalendarDay} from "react-icons/all";
import {LoadingOverlay} from "components";

export interface IForm {
    onChange: (data: {
        targetedDate: Dayjs;
        maxFutureDays: number;
    }) => any;
    maxFutureDays: number;
    targetedDate: Dayjs;
    isLoading: boolean;
    earliestDateAvailable: Dayjs;
    latestDateAvailable: Dayjs;
}


const Form = ({
    isLoading,
    maxFutureDays,
    onChange,
    targetedDate,
    earliestDateAvailable,
    latestDateAvailable,
}: IForm) => {
    const {
        inputIconColor,
    } = useColors();
    const {t} = useTranslation();

    const [formTargetedDate, setFormTargetedDate] = useInheritedState<Dayjs>(targetedDate);
    const [formMaxFutureDays, setFormMaxFutureDays] = useInheritedState<number>(maxFutureDays);

    const dayLabel = t("Tage");

    const updateParentForm = () => {
        onChange({
            targetedDate,
            maxFutureDays,
        });
    };

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
                                onBlur={updateParentForm}
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
                                    onBlur={updateParentForm}
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

export default Form;
