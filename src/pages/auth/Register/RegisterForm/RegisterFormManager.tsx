import React from "react";
import {useSendRegistrationAPI} from "hooks";
import {useMutation} from "react-query";
import {LoadingOverlay} from "components/overlays";
import {IFillOutDataResponse} from "hooks/apis/send/useSendFillOutDataAPI";

import RegisterForm from "./RegisterForm";

export interface IRegisterFormManager {
    onRegister: (data: IFillOutDataResponse) => void;
}

const RegisterFormManager = ({onRegister}: IRegisterFormManager) => {
    const sendRegistration = useSendRegistrationAPI();
    const [mutate, {isLoading: isLoadingRegistration, error}] = useMutation(sendRegistration, {
        onSuccess: data => onRegister(data),
    });

    const handleRegister = ({email, password, token}) => {
        mutate({
            email,
            password,
            token,
        });
    };

    return (
        <LoadingOverlay isLoading={isLoadingRegistration}>
            <RegisterForm errors={error?.response?.data} onRegister={handleRegister} />
        </LoadingOverlay>
    );
};

export default RegisterFormManager;
