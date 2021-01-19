import React from "react";
import {useTranslation} from "react-i18next";
import {Box, Typography} from "@material-ui/core";


const Completed = () => {
    const {t} = useTranslation();

    return (
        <Box>
            <Typography variant="h1">
                {t("Super")}
            </Typography>
            <Typography variant="body1">
                {t("Überprüfe jetzt deine E-Mail. Dort geht's dann weiter!")}
            </Typography>
        </Box>
    );
};


export default Completed;
