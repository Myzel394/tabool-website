import React, {useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {PrimaryButton} from "components/buttons";
import {ErrorResponse} from "types";

import Form from "../../Form";

import ConfirmKey from "./inputs/ConfirmKey";

export interface IEmailVerificationForm {
    onVerify: (token: string) => void;
    errors: ErrorResponse;
    initialCode: string;
}

const EmailVerificationForm = ({onVerify, initialCode, errors}: IEmailVerificationForm) => {
    const {t} = useTranslation();
    const [token, setToken] = useState<string>(initialCode);
    const form = useMemo(() =>
        <ConfirmKey
            value={token}
            onChange={value => setToken(value)}
            errorMessages={errors?.detail}
            required
        />,
    [token, errors]);
    const actions = useMemo(() =>
        <PrimaryButton type="submit">{t("E-Mail bestätigen")}</PrimaryButton>,
    [t]);

    return (
        <Form
            headerTitle={t("E-Mail bestätigen")}
            onSubmit={() => onVerify(token)}
            form={form}
            actions={actions}
        />
    );
};

EmailVerificationForm.defaultProps = {
    initialCode: "",
};

export default EmailVerificationForm;
