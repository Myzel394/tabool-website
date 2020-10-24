import React, {memo, useCallback, useState} from "react";
import {InputAdornment} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {MdVisibility, MdVisibilityOff} from "react-icons/all";
import {useTranslation} from "react-i18next";

import TextInput, {ITextInput} from "./TextInput";

export type IPasswordInput = Omit<ITextInput, "onChange"> & {
    label: string;

    onChange: (value: string) => void;
};


const PasswordInput = (props: IPasswordInput) => {
    const {t} = useTranslation();
    const {
        label = t("Passwort"),
        InputProps,
        onChange,
        ...other
    } = props;

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePassword = useCallback(() =>
        setShowPassword(value => !value), []);
    const type = showPassword ? "text" : "password";

    return (
        <TextInput
            {...other}
            fullWidth
            type={type}
            label={label}
            InputProps={{
                ...InputProps,
                endAdornment:
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePassword}
                        >
                            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </IconButton>
                    </InputAdornment>,
            }}
            onChange={event => onChange(event.target.value)}
        />
    );
};

export default memo(PasswordInput);
