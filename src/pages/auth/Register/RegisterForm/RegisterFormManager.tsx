import React, {useMemo} from "react";
import {useTranslation} from "react-i18next";
import {useGetOptions, useSendRegistrationAPI} from "hooks";
import {LoadingIndicator} from "components/indicators";
import {useMutation} from "react-query";
import {LoadingOverlay} from "components/overlays";
import {ISendFillOutDataResponse} from "hooks/apis/auth/useSendFillOutDataAPI";

import RegisterForm from "./RegisterForm";

export interface IRegisterFormManager {
    onRegister: (data: ISendFillOutDataResponse) => void;
}

const RegisterFormManager = ({onRegister}: IRegisterFormManager) => {
    const {t} = useTranslation();
    const sendRegistration = useSendRegistrationAPI();

    // Options
    const fallbackFields = useMemo(() => ({
        email: {
            label: t("E-Mail"),
            type: "email",
            required: true,
            readOnly: false,
        },
        password: {
            label: t("Passwort"),
            type: "password",
            required: true,
            readOnly: false,
        },
        token: {
            label: t("Token"),
            type: "text",
            required: true,
            readOnly: false,
        },
    }), [t]);
    const [fields, isLoading] = useGetOptions("/api/auth/registration/", fallbackFields);

    // Registration
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
        <LoadingIndicator isLoading={isLoading}>
            {() =>
                <LoadingOverlay isLoading={isLoadingRegistration}>
                    <RegisterForm errors={error?.response?.data} fields={fields} onRegister={handleRegister} />
                </LoadingOverlay>
            }
        </LoadingIndicator>
    );
};

export default RegisterFormManager;
