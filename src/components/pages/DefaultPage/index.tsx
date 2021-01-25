import React, {ReactNode, useContext} from "react";
import {Box, BoxProps} from "@material-ui/core";
import {Container} from "components/containers";
import {UtilsContext} from "contexts";

import BasePage from "../BasePage";

export interface IDefaultPage extends BoxProps {
    children: ReactNode;
}

const DefaultPage = ({children, style, ...other}: IDefaultPage) => {
    const {bottomSheetHeight} = useContext(UtilsContext);
    const containerStyles = {
        ...style,
        width: "100%",
        minHeight: `calc(100vh - ${bottomSheetHeight ?? 0}px)`,
    };

    return (
        <BasePage>
            <Container>
                <Box
                    my={1}
                    px={1}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    style={containerStyles}
                    {...other}
                >
                    {children}
                </Box>
            </Container>
        </BasePage>
    );
};

export default DefaultPage;
