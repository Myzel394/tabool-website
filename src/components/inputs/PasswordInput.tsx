import React, {memo, useCallback, useState} from "react";
import {InputAdornment} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {MdVisibility, MdVisibilityOff} from "react-icons/all";

import TextInput, {ITextInput} from "./TextInput";

export type IPasswordInput = ITextInput;


const PasswordInput = ({InputProps, ...other}: IPasswordInput) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePassword = useCallback(() =>
        setShowPassword(value => !value), []);
    const type = showPassword ? "text" : "password";

    return (
        <TextInput
            {...other}
            type={type}
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
        />
    );
};

export default memo(PasswordInput);
