import React, {memo} from "react";
import {Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";

const ErrorStatus = () => {
    const {t} = useTranslation();

    return (
        <Typography color="error">{t("Es gab einen Fehler. Versuche es später erneut.")}</Typography>
    );
};

export default memo(ErrorStatus);
