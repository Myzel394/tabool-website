import React from "react";
import {FocusedPage} from "components/pages";
import {useTranslation} from "react-i18next";

import EmailVerificationManager from "./EmailVerificationManager";

const EmailVerification = () => {
    const {t} = useTranslation();

    return (
        <FocusedPage title={t("E-Mail bestätigen")}>
            <EmailVerificationManager />
        </FocusedPage>
    );
};

export default EmailVerification;
