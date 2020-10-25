import React, {memo} from "react";
import {useMutation} from "react-query";
import {LoadingOverlay} from "components/overlays";
import {useSendLoginAPI} from "hooks/apis/auth";
import {ILoginResponse} from "hooks/apis/auth/useSendLoginAPI";

import LoginForm from "./LoginForm";

export interface ILoginFormManager {
    onLoggedIn: (data: ILoginResponse) => void;
}

const LoginFormManager = ({onLoggedIn}: ILoginFormManager) => {
    const sendLogin = useSendLoginAPI();
    const [mutate, {isLoading, error}] = useMutation(sendLogin, {
        onSuccess: (data: ILoginResponse) => {
            onLoggedIn(data);
        },
    });

    return (
        <LoadingOverlay isLoading={isLoading}>
            <LoginForm
                errors={error?.response?.data}
                onLogin={({email, password}) => mutate({
                    email,
                    password,
                })}
            />
        </LoadingOverlay>
    );
};

export default memo(LoginFormManager);
