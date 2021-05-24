import React, {memo} from "react";
import {useTranslation} from "react-i18next";
import {Typography} from "@material-ui/core";
import {FocusedPage} from "components";

export interface ErrorProps {
    status?: number;
    title?: string;
    message?: string;
}

const Error = ({
    title,
    message,
    status,
}: ErrorProps) => {
    const {t} = useTranslation();

    return (
        <FocusedPage>
            <Typography variant="h1" color="error">
                {title ?? t("Fehler")}
            </Typography>
            {status && (
                <Typography variant="h3" color="error">
                    {status ?? ""}
                </Typography>
            )}
            {message && (
                <Typography variant="body1" color="textPrimary">
                    {message}
                </Typography>
            )}
        </FocusedPage>
    );
};

export default memo(Error);
