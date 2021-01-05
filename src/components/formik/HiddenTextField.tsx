import React, {useState} from "react";
import {TextField, TextFieldProps} from "formik-material-ui";
import {isEdge} from "react-device-detect";
import {MdVisibility, MdVisibilityOff} from "react-icons/all";
import {IconButton, InputAdornment} from "@material-ui/core";
import {useColors} from "hooks";


export type IHiddenTextField = TextFieldProps;


const HiddenTextField = ({
    type = "text",
    ...other
}: IHiddenTextField) => {
    const {
        inputIconColor,
    } = useColors();
    const disableCustomImplementation = isEdge;

    const [visible, setVisible] = useState<boolean>(false);

    const fieldType = (() => {
        if (disableCustomImplementation) {
            return undefined;
        }
        return visible ? type : "password";
    })();

    return (
        <TextField
            {...other}
            type={fieldType}
            InputProps={{
                ...(other.InputProps ?? {}),
                endAdornment: disableCustomImplementation
                    ? other?.InputProps?.endAdornment
                    : (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setVisible(prevState => !prevState)}>
                                {visible
                                    ? <MdVisibilityOff color={inputIconColor} />
                                    : <MdVisibility color={inputIconColor} />
                                }
                            </IconButton>
                        </InputAdornment>
                    ),
            }}
        />
    );
};

export default HiddenTextField;
