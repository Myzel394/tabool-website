import React, {memo, useContext} from "react";
import {FocusedPage} from "components/pages";
import {useTranslation} from "react-i18next";
import {UserContext} from "contexts";
import {useHistory} from "react-router";

import {LoginFormManager} from "./LoginForm";

const LoginManager = () => {
    const {t} = useTranslation();
    const {dispatch} = useContext(UserContext);
    const history = useHistory();

    return (
        <FocusedPage disableBackButton title={t("Anmelden")}>
            <LoginFormManager
                onLoggedIn={({hasFilledOutData, isConfirmed}) => {
                    dispatch({
                        type: "login",
                        payload: {
                            isFullyRegistered: hasFilledOutData,
                            isEmailVerified: isConfirmed,
                        },
                    });
                    history.push("/");
                }}
            />
        </FocusedPage>
    );
};

export default memo(LoginManager);
