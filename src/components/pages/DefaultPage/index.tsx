import React, {ReactNode} from "react";
import {Box, BoxProps} from "@material-ui/core";
import {Container} from "components/containers";

import BasePage from "../BasePage";

export interface IDefaultPage extends BoxProps {
    children: ReactNode;
}

const DefaultPage = ({children, ...other}: IDefaultPage) => {
    return (
        <BasePage>
            <Container>
                <Box
                    display="flex"
                    flexDirection="column"
                    marginX={1}
                    marginY={2}
                    alignItems="center"
                    {...other}
                >
                    {children}
                </Box>
            </Container>
        </BasePage>
    );
};

export default DefaultPage;
