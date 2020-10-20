import React, {memo} from "react";
import {FormGroup, FormHelperText, Link} from "@material-ui/core";
import PasswordInput, {IPasswordInput} from "components/inputs/PasswordInput";
import {Trans} from "react-i18next";

export type IPassword = Omit<IPasswordInput, "renderIcon"> & {
    label: string;
    onChange: (value: string) => any;
    validators: any[];
    isOriginalPassword: boolean;

    helpText?: string;
};

const Password = ({label, helpText, onChange, validators, isOriginalPassword, ...other}: IPassword) => {
    return (
        <FormGroup>
            <PasswordInput
                {...other}
                label={label}
                onChange={event => onChange(event.target.value)}
                validators={validators}
            />
            {helpText && <FormHelperText>{helpText}</FormHelperText>}
            {isOriginalPassword && <FormHelperText>
                <Trans>
                    Wenn du Schwierigkeiten hast, dir starke Passwörter zu merken,
                    dir Passwörter aufschreibst oder Passwörter doppelt benutzt,
                    solltest du lieber einen Passwort-Manager wie{" "}
                    <Link href="https://bitwarden.com/" rel="noopener noreferrer">Bitwarden</Link>
                    {" "}oder{" "}
                    <Link href="https://passwords.google.com/" rel="noopener noreferrer">Googles Passwort-Manager</Link>
                    {" "}benutzen.
                </Trans>
            </FormHelperText>}
        </FormGroup>
    );
};

Password.defaultProps = {
    isOriginalPassword: false,
};

export default memo(Password);
