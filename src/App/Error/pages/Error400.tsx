import React, {memo} from "react";
import {useTranslation} from "react-i18next";
import {Button, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {RiArrowGoBackFill} from "react-icons/all";

import BasePage from "./BasePage";


export interface IError400 {
    title?: string;
}


const Error400 = ({
    title,
}: IError400) => {
    const {t} = useTranslation();
    const history = useHistory();

    return (
        <BasePage title={title ?? t("Ungültige Eingabe")}>
            <>
                <Typography variant="body2">
                    {t("Deine Eingabe ist nicht gültig.")}
                </Typography>
                <Button startIcon={<RiArrowGoBackFill />} onClick={() => history.goBack()}>
                    {t("Zurück gehen")}
                </Button>
            </>
        </BasePage>
    );
};

export default memo(Error400);
