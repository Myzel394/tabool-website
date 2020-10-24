import React from "react";
import {Tooltip as MuiTooltip, TooltipProps} from "@material-ui/core";

export type ITooltip = Omit<TooltipProps, "enterTouchDelay">;

const Tooltip = ({children, ...other}: ITooltip) => {
    return (
        <MuiTooltip {...other} enterTouchDelay={0}>
            {children}
        </MuiTooltip>
    );
};

export default Tooltip;
