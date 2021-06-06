import React, {ReactNode} from "react";
import {Box, BoxProps, makeStyles} from "@material-ui/core";
import {isMobile} from "react-device-detect";

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

    return (
        <Box
            display="flex"
            flexWrap={isMobile ? "wrap" : "nowrap"}
            className={classes.wrapper}
            {...other}
        >
            {children}
        </Box>
    );
};

export default HorizontalScrollWrapper;
