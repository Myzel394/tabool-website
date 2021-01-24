import React from "react";
import {useTranslation} from "react-i18next";
import {Typography} from "@material-ui/core";
import {FocusedPage} from "components";


const NotLoaded = () => {
    const {t} = useTranslation();

    return (
        <FocusedPage disableBackButton title={t("Stundenplan nicht verfügbar")}>
            <Typography variant="body1">
                {t("Dein Stundenplan wurde noch nicht geladen.")}
            </Typography>
            <Typography variant="body1">
                {t("Er wird automatisch alle paar Minuten geladen, warte ein bisschen.")}
            </Typography>
        </FocusedPage>
    );
};
export default NotLoaded;


