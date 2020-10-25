import React, {memo} from "react";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useUniqueId} from "hooks";
import {Choice} from "types";


export type IClassNumberInput = Omit<SelectProps, "labelId" | "variant"> & {
    choices: Choice[];
    onChange: (value: any) => void;
    helpText?: string;
};

export const DEFAULT_CLASS_NUMBER_CHOICES = [5, 6, 7, 8, 9, 10, 11, 12, 13].map(num => ({
    value: num,
    displayName: num.toString(),
}));

const ClassNumberInput = ({helpText, onChange, choices, ...other}: IClassNumberInput) => {
    const {t} = useTranslation();
    const labelId = useUniqueId();
    const label = t("Klassenstufe");

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                {...other}
                labelId={labelId}
                displayEmpty={false}
                label={label}
                onChange={event => onChange(event.target.value)}
            >
                {choices.map(choice =>
                    <MenuItem key={choice.value} value={choice.value}>{choice.displayName}</MenuItem>)}
                <MenuItem />
            </Select>
            {helpText && <FormHelperText>{helpText}</FormHelperText>}
        </FormControl>
    );
};

export default memo(ClassNumberInput);
