import React, {memo} from "react";
import {FocusedPage} from "components/pages";
import {useTranslation} from "react-i18next";

import {LoginFormManager} from "./LoginForm";

export interface ILoginManager {

}

const LoginManager = (props: ILoginManager) => {
    const {t} = useTranslation();

    return (
        <FocusedPage title={t("Anmelden")}>
            <LoginFormManager />
        </FocusedPage>
    );
};

export default memo(LoginManager);
