import React, {memo, useCallback} from "react";
import validators from "common-validators";
import {useTranslation} from "react-i18next";
import {FormGroup, FormHelperText, useTheme} from "@material-ui/core";
import {MdVpnKey} from "react-icons/all";

import InputWithIcon from "./InputWithIcon";

export interface IToken {
    label: string;
    minLength: number;
    maxLength: number;
    onChange: (data: string) => any;

    helpText?: string;
}

const Token = ({minLength, maxLength, label, helpText, onChange}: IToken) => {
    const {t} = useTranslation();
    const theme = useTheme();

    const tokenValidator = useCallback(value => {
        if (validators.minLength(value, minLength) ||
            validators.maxLength(value, maxLength)) {
            return t("Der Token ist nicht richtig lang. Vielleicht falsch kopiert?");
        }
    }, [minLength, maxLength]);

    return (
        <FormGroup>
            <InputWithIcon
                renderIcon={(props) => <MdVpnKey {...props} />}
                type="text"
                label={label}
                validators={[tokenValidator]}
                onChange={event => onChange(event.target.value)}
            />
            {helpText && <FormHelperText>{helpText}</FormHelperText>}
        </FormGroup>
    );
};

export default memo(Token);
