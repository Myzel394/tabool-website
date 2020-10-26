import React from "react";
import {Button} from "@material-ui/core";
import {ButtonProps} from "@material-ui/core/Button";

export interface ISecondaryButton extends ButtonProps {};

const SecondaryButton = ({children, ...other}: ISecondaryButton) => {
    return (
        <Button {...other} variant="outlined" color="secondary">{children}</Button>
    );
};

export default SecondaryButton;
