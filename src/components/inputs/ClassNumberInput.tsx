import React, {memo} from "react";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useUniqueId} from "hooks";
import {Choice} from "types";


export type IClassNumberInput = Omit<SelectProps, "labelId" | "variant"> & {
    label: string;
    choices: Choice[];
    onChange: (value: any) => void;
    helpText?: string;
};

const ClassNumberInput = (props: IClassNumberInput) => {
    const {t} = useTranslation();
    const {
        label = t("Klassenstufe"),
        choices,
        helpText,
        onChange,
        ...other
    } = props;
    const labelId = useUniqueId();


    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                {...other}
                labelId={labelId}
                displayEmpty={false}
                label={label}
                onChange={event => onChange(event.target.value)}
            >
                {choices.map(choice =>
                    <MenuItem value={choice.value} key={choice.value}>{choice.displayName}</MenuItem>)}
                <MenuItem />
            </Select>
            {helpText && <FormHelperText>{helpText}</FormHelperText>}
        </FormControl>
    );
};

export default memo(ClassNumberInput);
