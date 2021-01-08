import React, {ReactNode, useContext} from "react";
import {Box, Container, useTheme} from "@material-ui/core";
import {BackButton, Tooltip} from "components";
import {useTranslation} from "react-i18next";

import Logo from "../../Logo";
import BasePage from "../BasePage";
import {UtilsContext} from "../../../contexts";

import Title from "./Title";

export interface IFocusedPage {
    children: ReactNode;
    title?: string;
    important?: boolean;
    disableBackButton?: boolean;
    showLogo?: boolean;
}


export default function FocusedPage({children, title, important, disableBackButton, showLogo}: IFocusedPage) {
    const {t} = useTranslation();
    const {bottomSheetHeight} = useContext(UtilsContext);
    const theme = useTheme();
    const containerStyles = {
        backgroundColor: theme.palette.background.paper,
        minHeight: `calc(100vh - ${bottomSheetHeight}px)`,
    };

    return (
        <BasePage>
            <Box
                style={containerStyles}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Container maxWidth="sm">
                    <Box marginY={1} marginX={2}>
                        {!disableBackButton &&
                            <Box display="flex" justifyContent="flex-end">
                                <Tooltip title={t("Zurück gehen").toString()}>
                                    <>
                                        {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
                                        <span>
                                            <BackButton confirm={important} />
                                        </span>
                                    </>
                                </Tooltip>
                            </Box>
                        }
                        {title &&
                            <>
                                {showLogo && <Logo />}
                                <Title title={title} />
                            </>
                        }
                        {children}
                    </Box>
                </Container>
            </Box>
        </BasePage>
    );
}

FocusedPage.defaultProps = {
    important: false,
};
