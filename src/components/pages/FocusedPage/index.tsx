import React, {ReactNode} from "react";
import {Box, Container, useTheme} from "@material-ui/core";
import {BackButton, Tooltip} from "components";
import {useTranslation} from "react-i18next";

import styles from "./index.module.scss";
import Title from "./Title";

export interface IFocusedPage {
    children: ReactNode;
    title: string;
    important?: boolean;
}


export default function FocusedPage({children, title, important}: IFocusedPage) {
    const {t} = useTranslation();
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
                        <Tooltip title={t("Zurück gehen").toString()}>
                            <span>
                                <BackButton confirm={important} />
                            </span>
                        </Tooltip>
                    </Box>
                    <Title title={title} />
                    {children}
                </Box>
            </Container>
        </Box>
    );
}

FocusedPage.defaultProps = {
    important: false,
};
