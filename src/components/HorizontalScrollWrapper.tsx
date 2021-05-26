import React, {ReactNode} from "react";
import {Box, BoxProps, makeStyles} from "@material-ui/core";

import {useDeviceWidth} from "../hooks";

export interface HorizontalScrollWrapperProps extends BoxProps {
    children: ReactNode;
}

const useClasses = makeStyles(() => ({
    wrapper: {
        overflowX: "auto",
        "&::-webkit-scrollbar": {
            display: "none",
        },
        "& > button": {
            flex: "0 0 auto",
        },
    },
}));

const HorizontalScrollWrapper = ({
    children,
    ...other
}: HorizontalScrollWrapperProps) => {
    const classes = useClasses();
    const {isLG} = useDeviceWidth();

    return (
        <Box
            display="flex"
            flexWrap={isLG ? "wrap" : "nowrap"}
            className={classes.wrapper}
            {...other}
        >
            {children}
        </Box>
    );
};

export default HorizontalScrollWrapper;
