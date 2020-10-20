import React, {memo, useCallback} from "react";
import {FormGroup, FormHelperText} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import validators from "common-validators";
import {MdEmail} from "react-icons/all";
import InputWithIcon, {IInputWithIcon} from "components/inputs/InputWithIcon";

export type IEmail = Omit<IInputWithIcon, "renderIcon"> & {
    label: string;
    onChange: (value: string) => any;

    helpText?: string;
};

const Email = ({label, helpText, onChange, ...other}: IEmail) => {
    const {t} = useTranslation();
    const emailValidator = useCallback(value => {
        if (validators.email(value)) {
            return t("Diese E-Mail-Adresse ist nicht gültig");
        }
    }, [t]);

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

export default memo(Email);
