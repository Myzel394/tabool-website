import React, {memo, ReactElement, useState} from "react";
import {InputAdornment, useTheme} from "@material-ui/core";
import {TextInput} from "components/inputs";
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
    const color = isFocused ? theme.palette.primary.main : theme.palette.grey["600"];

    return (
        <TextInput
            {...other}
            onFocus={(event) => {
                // Super
                if (onFocus) {
                    onFocus(event);
                }

                setIsFocused(true);
            }}
            onBlur={(event) => {
                // Super
                if (onBlur) {
                    onBlur(event);
                }

                setIsFocused(false);
            }}
            startAdornment={(
                <InputAdornment position="start">
                    {renderIcon({
                        color,
                        style: {
                            transition: "80ms",
                        },
                    })}
                </InputAdornment>
            )}
        />
    );
};

export default memo(InputWithIcon);
