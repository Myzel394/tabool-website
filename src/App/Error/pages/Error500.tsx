import React, {memo} from "react";
import {FaServer} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {Typography} from "@material-ui/core";

import BasePage from "./BasePage";


export interface IError500 {
    title?: string;
}


const Error500 = ({
    title,
}: IError500) => {
    const {t} = useTranslation();

    return (
        <BasePage title={title ?? t("Server-Fehler")}>
            <>
                <FaServer size="2rem" />
                <Typography variant="body2">
                    {t("Der Server hat einen Fehler gemacht. Informiere uns bitte darüber, damit der Fehler schnellstmöglich behoben wird.")}
                </Typography>
            </>
        </BasePage>
    );
};

export default memo(Error500);
