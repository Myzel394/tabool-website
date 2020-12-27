import React, {memo, useContext, useState} from "react";
import {useQueryString} from "hooks";
import {useMutation} from "react-query";
import {ILoginResponse, ILoginData, useSendLoginAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {FocusedPage} from "components";
import {useTranslation} from "react-i18next";
import {UserContext} from "contexts";
import {useHistory} from "react-router-dom";
import {generatePath} from "react-router";

import LoginForm from "./LoginForm";
import SuspiciousLoginForm from "./SuspiciousLoginForm";


const Login = () => {
    const {t} = useTranslation();
    const sendLogin = useSendLoginAPI();
    const {next} = useQueryString();
    const {dispatch} = useContext(UserContext);
    const history = useHistory();

    const [isSuspicious, setIsSuspicious] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<ILoginData>();

    const {
        mutateAsync,
    } = useMutation<ILoginResponse, AxiosError, ILoginData>(
        sendLogin,
        {
            onError: (error, givenLoginData) => {
                if (error.response?.status === 401) {
                    setIsSuspicious(true);
                    setLoginData(givenLoginData);
                }
            },
            onSuccess: (data) => {
                dispatch({
                    type: "login",
                    payload: data,
                });
                history.push(typeof next === "string" ? next : generatePath("/"));
            },
        },
    );

    return (
        <FocusedPage title={isSuspicious ? undefined : t("Anmelden")}>
            {(isSuspicious && loginData)
                ? <SuspiciousLoginForm loginData={loginData} onSubmit={mutateAsync} />
                : <LoginForm onSubmit={mutateAsync} />
            }
        </FocusedPage>
    );
};


export default Login;
