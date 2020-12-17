import React, {memo, ReactElement, useMemo, useState} from "react";
import {InputAdornment, useTheme} from "@material-ui/core";
import {IconBaseProps} from "react-icons";

import TextInput, {ITextInput} from "./TextInput";

export type IInputWithIcon = ITextInput & {
    renderIcon: (props: IconBaseProps) => ReactElement;
};

const InputWithIcon = ({renderIcon, onFocus, onBlur, InputProps, ...other}: IInputWithIcon) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState<boolean>(false);
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
    const style = useMemo(() => ({
        backgroundColor: theme.palette.background.paper,
    }), [theme]);


    return (
        <TextInput
            {...other}
            InputProps={{
                ...InputProps,
                startAdornment,
                style,
            }}
            onFocus={event => {
                // Super
                if (onFocus) {
                    onFocus(event);
                }

                setIsFocused(true);
            }}
            onBlur={event => {
                // Super
                if (onBlur) {
                    onBlur(event);
                }

                setIsFocused(false);
            }}
        />
    );
};

export default memo(InputWithIcon);
