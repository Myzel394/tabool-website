import React, {CSSProperties, ReactNode} from "react";
import {Box} from "@material-ui/core";
import {useTranslation} from "react-i18next";

import {Logo} from "../../components";
import {BackButton} from "../../buttons";

import Title from "./Title";
import Wrapper from "./Wrapper";

export interface IFocusedPage {
    children: ReactNode;

    title?: string;
    important?: boolean;
    disableBackButton?: boolean;
    showLogo?: boolean;
    onBackButtonClick?: () => any;
    bottomContent?: ReactNode;
    style?: CSSProperties;
}


export default function FocusedPage({
    children,
    title,
    important,
    disableBackButton,
    showLogo,
    onBackButtonClick,
    bottomContent,
    style,
}: IFocusedPage) {
    const {t} = useTranslation();

    return (
        <Wrapper bottomContent={bottomContent} style={style}>
            <Box
                mx={2}
                my={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexDirection="column"
            >
                {!disableBackButton &&
                <Box display="flex" alignSelf="flex-end">
                    <BackButton confirm={important} onBack={onBackButtonClick} />
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
    );
}

FocusedPage.defaultProps = {
    important: false,
};
