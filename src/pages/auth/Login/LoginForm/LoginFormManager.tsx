import React, {memo} from "react";
import {useMutation} from "react-query";
import {sendLogin} from "api/auth";
import {ISendLoginResponse} from "api/auth/sendLogin";
import {LoadingOverlay} from "components/overlays";

import LoginForm from "./LoginForm";

export interface ILoginFormManager {
    onLoggedIn: (data: ISendLoginResponse) => void;
}

const LoginFormManager = ({onLoggedIn}: ILoginFormManager) => {
    const [mutate, {isLoading, error}] = useMutation(sendLogin, {
        onSuccess: (data: ISendLoginResponse) => onLoggedIn(data),
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
