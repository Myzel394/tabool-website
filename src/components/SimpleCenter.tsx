import React, {ReactNode} from "react";
import {Box} from "@material-ui/core";

export interface ISimpleCenter {
    children: ReactNode;
}

export default function SimpleCenter({children}: ISimpleCenter) {
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            {children}
        </Box>
    );
}
