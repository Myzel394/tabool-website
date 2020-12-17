import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {PrimaryButton, SecondaryButton} from "components/buttons";
import {Actions} from "components/containers";
import {ErrorResponse} from "types";
import Form, {buildGrid} from "components/forms/Form";
import EmailInput from "components/inputs/EmailInput";
import {useEmailValidator, usePasswordValidator} from "hooks/validators";
import {generatePath} from "react-router";

import Password from "./inputs/Password";
import Token from "./inputs/Token";

interface SubmitStates {
    email: string;
    password: string;
    token: string;
}

export interface IRegisterForm {
    errors: ErrorResponse;
    onRegister: (states: SubmitStates) => void;
}

const RegisterForm = ({onRegister, errors}: IRegisterForm) => {
    const {t} = useTranslation();

    // States
    const [ownErrors, setOwnErrors] = useState<ErrorResponse>({});
    const [email, setEmail] = useState<string>(""),
        [password, setPassword] = useState<string>(""),
        [secondPassword, setSecondPassword] = useState<string>(""),
        [token, setToken] = useState<string>("");

    // Validators
    const passwordValidator = usePasswordValidator();
    const emailValidator = useEmailValidator();
    const passwordsEqual = (): string | undefined => {
        if (password !== secondPassword) {
            return t("Die Passwörter sind nicht gleich");
        }
    };

    return (
        <Form
            form={buildGrid([
                <EmailInput
                    key="email"
                    required
                    value={email}
                    errorMessages={[
                        ...errors?.email || [],
                        ...ownErrors?.email || [],
                    ]}
                    onChange={value => setEmail(value)}
                />,
                <Token
                    key="token"
                    required
                    value={token}
                    errorMessages={errors?.token}
                    onChange={value => setToken(value)}
                />,
                <Password
                    key="password"
                    isOriginalPassword
                    required
                    label={t("Passwort")}
                    validators={[passwordValidator]}
                    value={password}
                    errorMessages={[
                        ...errors?.password || [],
                        ...ownErrors?.password || [],
                    ]}
                    onChange={value => setPassword(value)}
                />,
                <Password
                    key="confirm_password"
                    label={t("Passwort bestätigen")}
                    validators={[passwordsEqual]}
                    value={secondPassword}
                    errorMessages={ownErrors?.secondPassword}
                    onChange={value => setSecondPassword(value)}
                />,
            ])}
            actions={(
                <Actions>
                    <PrimaryButton type="submit">{t("Registrieren")}</PrimaryButton>
                    <SecondaryButton
                        href={generatePath("/auth/login/")}
                    >
                        {t("Anmelden")}
                    </SecondaryButton>
                </Actions>
            )}
            onSubmit={() => {
                // Reset
                setOwnErrors({});
                let tempErrors = {};

                const emailValid = emailValidator(email);
                if (typeof emailValid === "string") {
                    tempErrors = {
                        ...tempErrors,
                        email: emailValid,
                    };
                }
                const passwordValid = passwordValidator(password);
                if (typeof passwordValid === "string") {
                    tempErrors = {
                        ...tempErrors,
                        password: passwordValid,
                    };
                }
                const secondPasswordValid = passwordsEqual();
                if (typeof secondPasswordValid === "string") {
                    tempErrors = {
                        ...tempErrors,
                        secondPassword: secondPasswordValid,
                    };
                }

                setOwnErrors(tempErrors);

                if (Object.keys(tempErrors).length === 0) {
                    onRegister({
                        email,
                        token,
                        password,
                    });
                }
            }}
        />
    );
};

export default RegisterForm;
