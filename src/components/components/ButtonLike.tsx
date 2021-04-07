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
        <Box p={1} {...other} component={ButtonBase} style={style}>
            {children}
        </Box>
    );
};

export default ButtonLike;
