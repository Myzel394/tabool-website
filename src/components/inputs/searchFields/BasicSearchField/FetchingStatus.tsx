import React, {memo} from "react";
import {Box, CircularProgress, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";

const FetchingStatus = () => {
    const {t} = useTranslation();

    return (
        <Box display="flex" alignItems="center" marginY={2}>
            <CircularProgress />
            <Box ml={1}>
                <Typography color="textSecondary">{t("Neue Daten werden geladen")}</Typography>
            </Box>
        </Box>
    );
};

export default memo(FetchingStatus);
