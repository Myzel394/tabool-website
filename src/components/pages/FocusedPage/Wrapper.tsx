import React, {ReactNode, useContext} from "react";
import {Box, Container, useTheme} from "@material-ui/core";
import {UtilsContext} from "contexts";


export interface IWrapper {
    children: NonNullable<ReactNode>;

    maxWidth: "xs" | "sm" | "md" | "lg" | "xl" | false;
}

const noPadding = {
    padding: 0,
};

const Wrapper = ({children, maxWidth}: IWrapper) => {
    const {bottomSheetHeight} = useContext(UtilsContext);
    const theme = useTheme();
    const containerStyles = {
        backgroundColor: theme.palette.background.paper,
        minHeight: `calc(100vh - ${bottomSheetHeight ?? 0}px)`,
    };

    return (
        <Box
            style={containerStyles}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Container maxWidth={maxWidth} style={noPadding}>
                {children}
            </Container>
        </Box>
    );
};

Wrapper.defaultProps = {
    maxWidth: "sm",
};

export default Wrapper;
