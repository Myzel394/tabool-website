import React, {useContext, useState} from "react";
import {useQueryString, useTitle, useUser} from "hooks";
import {useMutation} from "react-query";
import {ILoginData, ILoginResponse, useSendLoginAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {FocusedPage} from "components";
import {useTranslation} from "react-i18next";
import {UserContext} from "contexts";
import {useHistory} from "react-router-dom";
import {buildPath} from "utils";
import {useDispatch} from "react-redux";
import {setRaw} from "state";

import LoginForm from "./LoginForm";
import SuspiciousLoginForm from "./SuspiciousLoginForm";


const Login = () => {
    const {t} = useTranslation();
    const sendLogin = useSendLoginAPI();
    const {next} = useQueryString();
    const {dispatch} = useContext(UserContext);
    const history = useHistory();
    const user = useUser();
    const reduxDispatch = useDispatch();

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
                reduxDispatch(setRaw(data.preference));
                history.push(typeof next === "string" ? next : buildPath("/"));
            },
        },
    );

    useTitle(t("Anmelden"));

    return (
        <FocusedPage title={isSuspicious ? undefined : t("Anmelden")} disableBackButton={!user.isAuthenticated}>
            {(isSuspicious && loginData)
                ? <SuspiciousLoginForm loginData={loginData} onSubmit={mutateAsync} />
                : <LoginForm onSubmit={mutateAsync} />
            }
        </FocusedPage>
    );
};


export default Login;
