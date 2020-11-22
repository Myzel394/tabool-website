import React, {memo, ReactNode, useMemo} from "react";
import {IconButton, IconButtonProps} from "@material-ui/core";

export interface IAction extends IconButtonProps {
    icon: ReactNode;
    isActive?: boolean;
}

const Action = ({icon, isActive, style, ...other}: IAction) => {
    const buttonStyle = useMemo(() => ({
        ...style ?? {},
        opacity: isActive ? 1 : 0.2,
    }), [isActive, style]);

    return (
        <IconButton style={buttonStyle} {...other}>
            {icon}
        </IconButton>
    );
};

export default memo(Action);
