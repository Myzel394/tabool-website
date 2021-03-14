import React from "react";
import {Box, Container as MUIContainer} from "@material-ui/core";

export interface IContainer {
    children: JSX.Element;
}

const style = {
    padding: 0,
};

export default function Container({children}: IContainer) {
    return (
        <Box flexDirection="column" display="flex" justifyContent="center" alignItems="center">
            <MUIContainer style={style}>
                {children}
            </MUIContainer>
        </Box>
    );
}
