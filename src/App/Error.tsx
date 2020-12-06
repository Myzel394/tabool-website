import React, {memo, ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {Box, Container, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {SecondaryButton} from "components";

export interface IError {
    status?: number;
    message?: string;
    title?: string;
    avoidReloading?: boolean;
    onRetry?: () => any;
    dialog?: ReactNode;
}

const Error = ({
    title: givenTitle,
    message,
    avoidReloading,
    dialog,
    onRetry,
    status,
}: IError) => {
    const history = useHistory();
    const {t} = useTranslation();

    const title = givenTitle ?? t("Fehler");

    return (
        <>
            <Container maxWidth="md">
                <Box textAlign="center">
                    <Typography variant="h1" color="error">
                        {title}
                    </Typography>
                    {status && (
                        <Typography variant="h3" color="error">
                            {status ? status : ""}
                        </Typography>
                    )}
                    {message && (
                        <Typography variant="body1" color="textPrimary">
                            {message}
                        </Typography>
                    )}
                    <Box mt={2}>
                        {!avoidReloading && (
                            onRetry ? (
                                <SecondaryButton onClick={onRetry}>
                                    {t("Erneut versuchen")}
                                </SecondaryButton>
                            ) : (
                                <SecondaryButton onClick={() => history.go(0)}>
                                    {t("Seite neuladen")}
                                </SecondaryButton>
                            )
                        )}
                    </Box>
                </Box>
            </Container>
            {dialog}
        </>
    );
};

export default memo(Error);
