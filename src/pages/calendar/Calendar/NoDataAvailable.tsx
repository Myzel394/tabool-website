import React, {memo} from "react";
import {Container, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";

const NoDataAvailable = () => {
    const {t} = useTranslation();

    return (
        <Container maxWidth="sm">
            <Typography variant="h3" component="h1">
                {t("Keine Daten verfügbar")}
            </Typography>
            <Typography variant="body1">
                {t("Es sind keine Daten für diese Woche verfügbar.")}
            </Typography>
        </Container>
    );
};

export default memo(NoDataAvailable);
