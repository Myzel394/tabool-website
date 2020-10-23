import React, {memo, useState} from "react";
import Form, {buildGrid} from "components/forms/Form";
import {useTranslation} from "react-i18next";
import {EmailInput, PasswordInput} from "components/inputs";
import {PrimaryButton, SecondaryButton} from "components/buttons";
import {generatePath, Link} from "react-router-dom";
import {ErrorResponse} from "types";
import {useEmailValidator, usePasswordValidator} from "hooks/validators";

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

    const emailValidator = useEmailValidator();
    const passwordValidator = usePasswordValidator();

    const [ownErrors, setOwnErrors] = useState<ErrorResponse>({});
    const [email, setEmail] = useState<string>(""),
        [password, setPassword] = useState<string>("");

    return (
        <Form
            form={
                buildGrid([
                    <EmailInput
                        key="email"
                        value={email}
                        type="email"
                        label={t("E-Mail")}
                        errorMessages={[
                            ...errors?.email || [],
                            ...ownErrors?.email,
                        ]}
                        onChange={value => setEmail(value)}
                    />,
                    <PasswordInput
                        key="password"
                        value={password}
                        errorMessages={[
                            ...errors?.password || [],
                            ...ownErrors?.password,
                        ]}
                        onChange={value => setPassword(value)}
                    />,
                ])
            }
            actions={
                <>
                    <PrimaryButton title={t("Anmelden")} />
                    <Link to={generatePath("/auth/registration/")}>
                        <SecondaryButton title={t("Registrieren")} />
                    </Link>
                </>
            }
            onSubmit={() => {
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

                setOwnErrors(tempErrors);

                if (Object.keys(tempErrors).length === 0) {
                    onLogin({
                        email,
                        password,
                    });
                }
            }}
        />
    );
};

export default memo(LoginForm);
