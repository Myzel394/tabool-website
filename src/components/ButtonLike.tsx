import React, {ReactNode} from "react";
import {Box, BoxProps, ButtonBase, useTheme} from "@material-ui/core";


export interface IButtonLike extends BoxProps {
    children: ReactNode;
}


const ButtonLike = ({children, style: givenStyle, ...other}: IButtonLike) => {
    const theme = useTheme();
    const style = {
        ...givenStyle,
        borderRadius: theme.shape.borderRadius,
    };

    return (
        <Box {...other} component={ButtonBase} p={1} style={style}>
            {children}
        </Box>
    );
};

export default ButtonLike;
