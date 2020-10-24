import React from "react";
import {FormGroup, FormHelperText} from "@material-ui/core";
import {MdEmail} from "react-icons/all";
import InputWithIcon, {IInputWithIcon} from "components/inputs/InputWithIcon";
import {useEmailValidator} from "hooks/validators";
import {useTranslation} from "react-i18next";

export type IEmailInput = Omit<IInputWithIcon, "renderIcon"> & {
    onChange: (value: string) => any;

    helpText?: string;
};

const EmailInput = (props: IEmailInput) => {
    const {t} = useTranslation();
    const {
        label = t("E-Mail"),
        helpText,
        onChange,
        ...other
    } = props;

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
