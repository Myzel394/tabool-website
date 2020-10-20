import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Box} from "@material-ui/core";
import {PrimaryButton} from "components/buttons";
import {ErrorResponse} from "types";

import Header from "../../Header";

import ConfirmKey from "./inputs/ConfirmKey";

export interface IEmailVerificationForm {
    onVerify: (token: string) => void;
    errors: ErrorResponse;
    initialCode: string;
}

const EmailVerificationForm = ({onVerify, initialCode, errors}: IEmailVerificationForm) => {
    const {t} = useTranslation();
    const [token, setToken] = useState<string>(initialCode);

    return (
        <>
            <Header title={t("E-Mail bestätigen")} />
            <form
                onSubmit={event => {
                    event.preventDefault();
                    onVerify(token);
                }}
            >
                <ConfirmKey
                    value={token}
                    onChange={value => setToken(value)}
                    errorMessages={errors?.detail}
                />
                <Box marginTop={3}>
                    <PrimaryButton type="submit">{t("E-Mail bestätigen")}</PrimaryButton>
                </Box>
            </form>
        </>
    );
};

EmailVerificationForm.defaultProps = {
    initialCode: "",
};

export default EmailVerificationForm;
