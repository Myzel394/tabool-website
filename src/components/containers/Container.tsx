import React from "react";
import {Box, Container as MUIContainer} from "@material-ui/core";

export interface ContainerProps {
    children: JSX.Element;
}

const style = {
    padding: 0,
};

export default function Container({children}: ContainerProps) {
    return (
        <Box flexDirection="column" display="flex" justifyContent="center" alignItems="center">
            <MUIContainer style={style} maxWidth="md">
                {children}
            </MUIContainer>
        </Box>
    );
}
