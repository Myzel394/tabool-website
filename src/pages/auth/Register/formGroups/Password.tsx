import React, {memo} from "react";
import {FormGroup, FormHelperText} from "@material-ui/core";
import PasswordInput from "components/inputs/PasswordInput";

export interface IPassword {
    label: string;
    onChange: (value: string) => any;
    validators: any[];

    helpText?: string;
}

const Password = ({label, helpText, onChange, validators}: IPassword) => {
    return (
        <FormGroup>
            <PasswordInput
                label={label}
                onChange={event => onChange(event.target.value)}
                validators={validators}
            />
            {helpText && <FormHelperText>{helpText}</FormHelperText>}
        </FormGroup>
    );
};

export default memo(Password);
