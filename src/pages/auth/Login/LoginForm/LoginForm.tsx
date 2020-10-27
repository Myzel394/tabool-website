import React, {memo, useState} from "react";
import Form, {buildGrid} from "components/forms/Form";
import {useTranslation} from "react-i18next";
import {EmailInput, PasswordInput} from "components/inputs";
import {PrimaryButton, SecondaryButton} from "components/buttons";
import {generatePath} from "react-router-dom";
import {ErrorResponse} from "types";
import {Actions} from "components/containers";
import {NonFieldErrors} from "components";

export interface SubmitState {
    email: string;
    password: string;
}

export interface ILoginForm {
    errors: ErrorResponse;
    onLogin: ({email, password}: SubmitState) => void;
}

const LoginForm = ({errors, onLogin}: ILoginForm) => {
    const {t} = useTranslation();

    const [email, setEmail] = useState<string>(""),
        [password, setPassword] = useState<string>("");

    return (
        <>
            <Form
                form={
                    <>
                        {buildGrid([
                            <EmailInput
                                key="email"
                                value={email}
                                type="email"
                                errorMessages={errors?.email}
                                onChange={value => setEmail(value)}
                            />,
                            <PasswordInput
                                key="password"
                                value={password}
                                errorMessages={errors?.password}
                                label={t("Passwort")}
                                onChange={value => setPassword(value)}
                            />,
                        ])}
                        {errors?.nonFieldErrors && <NonFieldErrors errors={errors.nonFieldErrors} />}
                    </>
                }
                actions={
                    <Actions>
                        <PrimaryButton key="login" type="submit">
                            {t("Anmelden")}
                        </PrimaryButton>
                        <SecondaryButton href={generatePath("/auth/registration/")}>
                            {t("Registrieren")}
                        </SecondaryButton>
                    </Actions>
                }
                onSubmit={() => onLogin({
                    email,
                    password,
                })}
            />
        </>
    );
};

export default memo(LoginForm);
