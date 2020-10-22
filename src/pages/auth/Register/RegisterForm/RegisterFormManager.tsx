import React, {useMemo} from "react";
import {useTranslation} from "react-i18next";
import {useGetOptions} from "hooks";
import {LoadingIndicator} from "components/indicators";
import {useMutation} from "react-query";
import {sendRegistration} from "api/auth";
import {LoadingOverlay} from "components/overlays";
import {ISendRegistrationResponse} from "api/auth/sendRegistration";

import RegisterForm from "./RegisterForm";

export interface IRegisterFormManager {
    onRegister: (data: ISendRegistrationResponse) => void;
}

const RegisterFormManager = ({onRegister}: IRegisterFormManager) => {
    const {t} = useTranslation();

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
    const [mutate, {isLoading: isLoadingRegistration, error: axiosError}] = useMutation(sendRegistration, {
        onSuccess: data => onRegister(data),
    });
    const handleRegister = ({email, password, token}) => {
        mutate({
            email,
            password,
            token,
        });
    };

    const errors = axiosError?.response?.data;

    return (
        <LoadingIndicator isLoading={isLoading}>
            {() =>
                <LoadingOverlay isLoading={isLoadingRegistration}>
                    <RegisterForm errors={errors} fields={fields} onRegister={handleRegister} />
                </LoadingOverlay>
            }
        </LoadingIndicator>
    );
};

export default RegisterFormManager;
