import React from "react";
import {FormControl, InputAdornment, InputLabel, MenuItem, Select} from "@material-ui/core";
import {FaCalendarWeek} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {useColors} from "hooks";
import {useDispatch, useSelector} from "react-redux";
import {getMaxFutureDays, RootState, setStartPageMaxFutureDays} from "states";

const DaysSelect = () => {
    const {t} = useTranslation();
    const {
        inputIconColor,
    } = useColors();

    const maxFutureDays = useSelector<RootState>(getMaxFutureDays) as number;
    const dispatch = useDispatch();

    const dayLabel = t("Tage");

    return (
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
                value={maxFutureDays}
                onChange={event => {
                    const value = event.target.value as number;
                    dispatch(setStartPageMaxFutureDays(value));
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
    );
};

export default DaysSelect;
