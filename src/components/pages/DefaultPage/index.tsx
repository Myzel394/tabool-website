import React, {ReactNode} from "react";
import {Box} from "@material-ui/core";

import BasePage from "../BasePage";

export interface IDefaultPage {
    children: ReactNode;
}

const DefaultPage = ({children}: IDefaultPage) => {
    return (
        <BasePage>
            <Box
                display="flex"
                flexDirection="column"
                marginX={1}
                marginY={2}
                alignItems="center"
            >
                {children}
            </Box>
        </BasePage>
    );
};

export default DefaultPage;
