import React, {memo, useCallback, useState} from "react";
import {InputAdornment} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {MdVisibility, MdVisibilityOff} from "react-icons/all";

import TextInput, {ITextInput} from "./TextInput";


const PasswordInput = (props: ITextInput) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePassword = useCallback(() =>
        setShowPassword(value => !value), []);
    const type = showPassword ? "text" : "password";

    return (
        <TextInput
            {...props}
            type={type}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePassword}
                    >
                        {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                </InputAdornment>
            }
        />
    );
};

export default memo(PasswordInput);
