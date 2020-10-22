import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import validators from "common-validators";
import {PrimaryButton, SecondaryButton} from "components/buttons";
import {Actions} from "components/containers";
import {ErrorResponse} from "types";

import Form, {buildGrid} from "../../Form";

import Email from "./inputs/Email";
import Password from "./inputs/Password";
import Token from "./inputs/Token";

const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

interface SubmitStates {
    email: string;
    password: string;
    token: string;
}

export interface IRegisterForm {
    fields: any;
    errors: ErrorResponse;
    onRegister: (states: SubmitStates) => void;
}

const RegisterForm = ({fields, onRegister, errors}: IRegisterForm) => {
    const {t} = useTranslation();
    // States
    const [email, setEmail] = useState<string>(""),
        [password, setPassword] = useState<string>(""),
        [secondPassword, setSecondPassword] = useState<string>(""),
        [token, setToken] = useState<string>("");

    // Validators
    const passwordValidator = value => {
        if (validators.pattern(value, PASSWORD_REGEX)) {
            return t(
                "Das Passwort ist nicht sicher genug (Es muss ein Sonderzeichen haben, eine Zahl, Groß- und Kleinbuchstaben, mindestens 8 Zeichen)",
            );
        }
    };
    const passwordEqual = () => {
        if (password !== secondPassword) {
            return t("Die Passwörter sind nicht gleich");
        }
    };

    return (
        <Form
            headerTitle={t("Registrieren")}
            form={buildGrid([
                <Email
                    key="email"
                    label={fields.email.label}
                    helpText={fields.email.helpText}
                    value={email}
                    errorMessages={errors?.email}
                    required={fields.email.required}
                    onChange={value => setEmail(value)}
                />,
                <Token
                    key="token"
                    label={fields.token.label}
                    helpText={fields.token.helpText}
                    minLength={fields.token.minLength || 0}
                    maxLength={fields.token.maxLength || 2047}
                    value={token}
                    errorMessages={errors?.token}
                    required={fields.token.required}
                    onChange={value => setToken(value)}
                />,
                <Password
                    key="password"
                    isOriginalPassword
                    label={fields.password.label}
                    helpText={fields.password.helpText}
                    validators={[passwordValidator]}
                    value={password}
                    errorMessages={errors?.password}
                    required={fields.password.required}
                    onChange={value => setPassword(value)}
                />,
                <Password
                    key="confirm_password"
                    label={t("Passwort bestätigen")}
                    validators={[passwordEqual]}
                    value={secondPassword}
                    onChange={value => setSecondPassword(value)}
                />,
            ])}
            actions={(
                <Actions>
                    <PrimaryButton type="submit">{t("Registrieren")}</PrimaryButton>
                    <SecondaryButton>{t("Anmelden")}</SecondaryButton>
                </Actions>
            )}
            onSubmit={() => onRegister({
                email,
                token,
                password,
            })}
        />
    );
};

export default RegisterForm;
