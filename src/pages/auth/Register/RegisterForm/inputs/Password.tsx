import React, {memo} from "react";
import {FormGroup, FormHelperText} from "@material-ui/core";
import PasswordInput, {IPasswordInput} from "components/inputs/PasswordInput";

export type IPassword = Omit<IPasswordInput, "renderIcon"> & {
    label: string;
    onChange: (value: string) => any;
    validators: any[];

    helpText?: string;
};

const Password = ({label, helpText, onChange, validators, ...other}: IPassword) => {
    return (
        <FormGroup>
            <PasswordInput
                {...other}
                label={label}
                onChange={event => onChange(event.target.value)}
                validators={validators}
            />
            {helpText && <FormHelperText>{helpText}</FormHelperText>}
        </FormGroup>
    );
};

export default memo(Password);
