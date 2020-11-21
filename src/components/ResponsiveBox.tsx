import React from "react";
import {Box, BoxProps} from "@material-ui/core";
import {useDeviceWidth} from "hooks";

export interface IResponsiveBox extends BoxProps {
    children: BoxProps["children"];
}

const ResponsiveBox = ({children, ...other}: IResponsiveBox) => {
    const {isLG} = useDeviceWidth();

    return (
        <Box
            flexDirection={isLG ? "row" : "column"}
            {...other}
        >
            {children}
        </Box>
    );
};

export default ResponsiveBox;
