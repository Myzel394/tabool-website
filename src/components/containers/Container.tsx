import React from "react";
import {Box, Container as MUIContainer} from "@material-ui/core";

export interface IContainer {
    children: JSX.Element;
}


export default function Container({children}: IContainer) {
    return (
        <Box flexDirection="column" display="flex" justifyContent="center" alignItems="center">
            <MUIContainer>
                {children}
            </MUIContainer>
        </Box>
    );
}
