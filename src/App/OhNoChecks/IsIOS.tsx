import React from "react";
import {FocusedPage, SecondaryButton} from "components";
import {Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";

export interface IIsIOS {
    onClose: () => any;
}

const IsIOS = ({
    onClose,
}: IIsIOS) => {
    const {t} = useTranslation();

    return (
        <FocusedPage title={t("Oh nein! Apple!")} onBackButtonClick={onClose}>
            <Typography variant="body1">
                {t("Leider verbietet Apple Web-Push-Benachrichtigungen. " +
                    "Daher können auf iOS-basierten Geräten dir keine Benachrichtigungen angezeigt werden. ")}
            </Typography>
            <Typography variant="body1">
                {t("Am besten wechselst du zu ein Android basiertes Gerät, diese bieten dir wesentlich mehr Freiheit, " +
                    "sind flexibler und bei weitem billiger als vergleichbare Apple-Geräte.")}
            </Typography>
            <SecondaryButton onClick={onClose}>
                {t("Schließen")}
            </SecondaryButton>
        </FocusedPage>
    );
};

export default IsIOS;
