import React, {memo, ReactElement, useCallback, useMemo, useState} from "react";
import {InputAdornment, useTheme} from "@material-ui/core";
import {IconBaseProps} from "react-icons";

import {ITextInput} from "./TextInput";

import {TextInput} from "./index";

export type IInputWithIcon = ITextInput & {
    renderIcon: (props: IconBaseProps) => ReactElement;
};

const InputWithIcon = ({renderIcon, onFocus, onBlur, InputProps, ...other}: IInputWithIcon) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const handleFocus = useCallback(event => {
        // Super
        if (onFocus) {
            onFocus(event);
        }

        setIsFocused(true);
    }, [onFocus]);
    const handleBlur = useCallback(event => {
        // Super
        if (onBlur) {
            onBlur(event);
        }

        setIsFocused(false);
    }, [onBlur]);
    const color = isFocused ? theme.palette.primary.main : theme.palette.grey["600"];
    const startAdornment = useMemo(() =>
        <InputAdornment position="start">
            {renderIcon({
                color,
                style: {
                    transition: "80ms",
                },
            })}
        </InputAdornment>
    , [color, renderIcon]);


    return (
        <TextInput
            {...other}
            onFocus={handleFocus}
            onBlur={handleBlur}
            InputProps={{...InputProps, startAdornment}}
        />
    );
};

export default memo(InputWithIcon);
