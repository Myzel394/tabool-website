import React, {memo, useCallback, useState} from "react";
import {InputAdornment} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {MdVisibility, MdVisibilityOff} from "react-icons/all";

import {usePasswordValidator} from "../../hooks/validators";

import TextInput, {ITextInput} from "./TextInput";

export type IPasswordInput = Omit<ITextInput, "onChange"> & {
    onChange: (value: string) => void;
};


const PasswordInput = ({InputProps, onChange, ...other}: IPasswordInput) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const passwordValidator = usePasswordValidator();

    const togglePassword = useCallback(() =>
        setShowPassword(value => !value), []);
    const type = showPassword ? "text" : "password";

    return (
        <TextInput
            {...other}
            type={type}
            validators={[passwordValidator]}
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
