import React, {memo, useCallback, useState} from "react";
import {useGetOptions} from "hooks";
import {LoadingOverlay} from "overlays";
import {Grid} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import validators from "common-validators";

import Email from "./formGroups/Email";
import Password from "./formGroups/Password";
import Token from "./formGroups/Token";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const RegisterForm = () => {
    const {t} = useTranslation();
    const [fields, isLoading] = useGetOptions("/api/auth/registration/");
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
            return t("Die Passwört sind nicht gleich!");
        }
    }, [password, secondPassword]);

    // Renderers
    const $childrenContent = useCallback(() => {

        return <form>
            <Grid container spacing={2} justify="center">
                <Grid item xs={12}>
                    <Email
                        label={fields.email.label}
                        helpText={fields.email.helpText}
                        onChange={value => setEmail(value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Password
                        label={fields.password.label}
                        helpText={fields.password.helpText}
                        validators={[passwordValidator]}
                        onChange={value => setPassword(value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Password
                        label={t("Passwort bestätigen")}
                        validators={[passwordEqual]}
                        onChange={value => setSecondPassword(value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Token
                        label={fields.token.label}
                        helpText={fields.token.helpText}
                        minLength={fields.token.minLength || 0}
                        maxLength={fields.token.maxLength || 2047}
                        onChange={value => setToken(value)}
                    />
                </Grid>
            </Grid>
        </form>;
    }, [fields]);

    return (
        <LoadingOverlay loading={isLoading}>
            {$childrenContent}
        </LoadingOverlay>
    );
};

export default memo(RegisterForm);
