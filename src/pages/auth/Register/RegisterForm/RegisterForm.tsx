import React, {useCallback, useMemo, useState} from "react";
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
    const passwordValidator = useCallback(value => {
        if (validators.pattern(value, PASSWORD_REGEX)) {
            return t(
                "Das Passwort ist nicht sicher genug (Es muss ein Sonderzeichen haben, eine Zahl, Groß- und Kleinbuchstaben, mindestens 8 Zeichen)",
            );
        }
    }, [t]);
    const passwordEqual = useCallback(() => {
        if (password !== secondPassword) {
            return t("Die Passwörter sind nicht gleich");
        }
    }, [password, secondPassword, t]);
    const form = useMemo(() => buildGrid([
        <Email
            label={fields.email.label}
            helpText={fields.email.helpText}
            onChange={value => setEmail(value)}
            value={email}
            errorMessages={errors?.email}
            required={fields.email.required}
            key="email"
        />,
        <Token
            label={fields.token.label}
            helpText={fields.token.helpText}
            minLength={fields.token.minLength || 0}
            maxLength={fields.token.maxLength || 2047}
            onChange={value => setToken(value)}
            value={token}
            errorMessages={errors?.token}
            required={fields.token.required}
            key="token"
        />,
        <Password
            label={fields.password.label}
            helpText={fields.password.helpText}
            validators={[passwordValidator]}
            onChange={value => setPassword(value)}
            value={password}
            errorMessages={errors?.password}
            isOriginalPassword
            required={fields.password.required}
            key="password"
        />,
        <Password
            label={t("Passwort bestätigen")}
            validators={[passwordEqual]}
            onChange={value => setSecondPassword(value)}
            value={secondPassword}
            key="confirm_password"
        />,
    ]), [t, fields, passwordEqual, passwordValidator, errors, email, password, secondPassword, token]);
    const actions = useMemo(() =>
        <Actions>
            <PrimaryButton type="submit">{t("Registrieren")}</PrimaryButton>
            <SecondaryButton>{t("Anmelden")}</SecondaryButton>
        </Actions>
    , [t]);

    return (
        <Form
            headerTitle={t("Registrieren")}
            onSubmit={() => onRegister({
                email,
                password,
                token,
            })}
            form={form}
            actions={actions}
        />
    );
};

export default RegisterForm;
