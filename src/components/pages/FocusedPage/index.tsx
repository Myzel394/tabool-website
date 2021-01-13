import React, {ReactNode} from "react";
import {Box} from "@material-ui/core";
import {BackButton, Tooltip} from "components";
import {useTranslation} from "react-i18next";

import Logo from "../../Logo";
import BasePage from "../BasePage";

import Title from "./Title";
import Wrapper from "./Wrapper";

export interface IFocusedPage {
    children: ReactNode;
    title?: string;
    important?: boolean;
    disableBackButton?: boolean;
    showLogo?: boolean;
    onBackButtonClick?: () => any;
}


export default function FocusedPage({
    children,
    title,
    important,
    disableBackButton,
    showLogo,
    onBackButtonClick,
}: IFocusedPage) {
    const {t} = useTranslation();

    return (
        <BasePage>
            <Wrapper>
                <Box marginY={1} marginX={2}>
                    {!disableBackButton &&
                        <Box display="flex" justifyContent="flex-end">
                            <Tooltip title={t("Zurück gehen").toString()}>
                                <>
                                    {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
                                    <span>
                                        <BackButton confirm={important} onBack={onBackButtonClick} />
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
            </Wrapper>
        </BasePage>
    );
}

FocusedPage.defaultProps = {
    important: false,
};
