import React, {CSSProperties, ReactNode} from "react";
import {Box} from "@material-ui/core";

import {BackButton} from "../../buttons";
import {Logo} from "../../../modules";

import Title from "./Title";
import Wrapper from "./Wrapper";

export interface FocusedPageProps {
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
}: FocusedPageProps) {
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
                {!disableBackButton && (
                    <Box display="flex" alignSelf="flex-end">
                        <BackButton confirm={important} onBack={onBackButtonClick} />
                    </Box>
                )}
                {title && (
                    <>
                        {showLogo && <Logo />}
                        <Title title={title} />
                    </>
                )}
                {children}
            </Box>
        </Wrapper>
    );
}

FocusedPage.defaultProps = {
    important: false,
};
