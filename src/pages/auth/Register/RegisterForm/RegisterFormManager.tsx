import React from "react";
import {useMutation} from "react-query";
import {LoadingOverlay} from "components/overlays";
import {AxiosError} from "axios";
import {IFillOutDataResponse, IRegistrationData, IRegistrationResponse, useSendRegistrationAPI} from "hooks/apis";

import RegisterForm from "./RegisterForm";

export interface IRegisterFormManager {
    onRegister: (data: IFillOutDataResponse) => void;
}

const RegisterFormManager = ({onRegister}: IRegisterFormManager) => {
    const sendRegistration = useSendRegistrationAPI();
    const {
        mutate,
        isLoading: isLoadingRegistration,
        error,
    } = useMutation<IRegistrationResponse, AxiosError, IRegistrationData>(
        sendRegistration,
        {
            onSuccess: data => onRegister(data),
        },
    );

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
