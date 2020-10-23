import React from "react";
import {FormGroup, FormHelperText} from "@material-ui/core";
import {MdEmail} from "react-icons/all";
import InputWithIcon, {IInputWithIcon} from "components/inputs/InputWithIcon";
import {useEmailValidator} from "hooks/validators";

export type IEmailInput = Omit<IInputWithIcon, "renderIcon"> & {
    label: string;
    onChange: (value: string) => any;

    helpText?: string;
};

const EmailInput = ({label, helpText, onChange, ...other}: IEmailInput) => {
    const emailValidator = useEmailValidator();

    return (
        <FormGroup>
            <InputWithIcon
                {...other}
                renderIcon={(props) => <MdEmail {...props} />}
                type="email"
                label={label}
                validators={[emailValidator]}
                onChange={event => onChange(event.target.value)}
            />
            {helpText && <FormHelperText>{helpText}</FormHelperText>}
        </FormGroup>
    );
};

export default EmailInput;
