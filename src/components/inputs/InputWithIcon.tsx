import React, {memo, ReactElement, useCallback, useMemo, useState} from "react";
import {InputAdornment, useTheme} from "@material-ui/core";
import {TextInput} from "components/inputs/index";
import {IconBaseProps} from "react-icons";

export interface IInputWithIcon {
    renderIcon: (props: IconBaseProps) => ReactElement;

    onBlur?: Function;
    onFocus?: Function;

    [key: string]: any;
}

const InputWithIcon = ({renderIcon, onFocus, onBlur, ...other}: IInputWithIcon) => {
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
            startAdornment={startAdornment}
        />
    );
};

export default memo(InputWithIcon);
