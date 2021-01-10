import React, {memo, ReactNode} from "react";
import {Box, ButtonBase, useTheme} from "@material-ui/core";


export interface IButtonLike {
    children: ReactNode;
}


const ButtonLike = ({children}: IButtonLike) => {
    const theme = useTheme();
    const style = {
        borderRadius: theme.shape.borderRadius,
    };

    return (
        <Box component={ButtonBase} p={1} style={style}>
            {children}
        </Box>
    );
};

export default memo(ButtonLike);
