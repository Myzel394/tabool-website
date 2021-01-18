import React, {memo} from "react";
import {Box, CircularProgress, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";


const Loading = () => {
    const {t} = useTranslation();

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{height: "100vh"}}>
            <CircularProgress />
            <Box pt={2}>
                <Typography variant="h5">
                    {t("Seite lädt")}
                </Typography>
            </Box>
        </Box>
    );
};

export default memo(Loading);
