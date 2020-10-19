import React, {ReactNode} from "react";
import {Box, Container, useTheme} from "@material-ui/core";
import BackButton from "components/buttons/BackButton";

import styles from "./index.module.scss";

export interface IFocusedPage {
    children: ReactNode;
    important?: boolean;
}


export default function FocusedPage({children, important}: IFocusedPage) {
    const theme = useTheme();
    const containerStyles = {
        backgroundColor: theme.palette.background.paper,
    };

    return (
        <Box
            style={containerStyles}
            display="flex"
            flexDirection="column"
            className={styles.container}
        >
            <Container maxWidth="sm">
                <Box marginY={1} marginX={2}>
                    <Box display="flex" justifyContent="flex-end">
                        <BackButton confirm={important} />
                    </Box>
                    {children}
                </Box>
            </Container>
        </Box>
    );
}

FocusedPage.defaultProps = {
    important: true,
};
