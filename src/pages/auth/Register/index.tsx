import React from "react";
import {FocusedPage} from "components/pages";
import {useTranslation} from "react-i18next";

import RegisterManager from "./RegisterManager";

export default function Register() {
    const {t} = useTranslation();

    return (
        <FocusedPage title={t("Registrieren")}>
            <RegisterManager />
        </FocusedPage>
    );
}
