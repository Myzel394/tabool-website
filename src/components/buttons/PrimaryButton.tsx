import React from "react";
import {Button} from "@material-ui/core";
import {ButtonProps} from "@material-ui/core/Button/Button";

export type IPrimaryButton = ButtonProps;

const PrimaryButton = ({children, ...other}: IPrimaryButton) => {
    return (
        <Button {...other} variant="contained" color="primary">{children}</Button>
    );
};

export default PrimaryButton;
