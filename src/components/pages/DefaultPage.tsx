import React, {ReactNode} from "react";
import {Box} from "@material-ui/core";

export interface IDefaultPage {
    children: ReactNode;
}

const DefaultPage = ({children}: IDefaultPage) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            marginX={1}
            marginY={2}
            alignItems="center"
        >
            {children}
        </Box>
    );
};

export default DefaultPage;
