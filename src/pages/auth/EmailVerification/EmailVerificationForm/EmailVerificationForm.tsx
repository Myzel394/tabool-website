import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {PrimaryButton} from "components/buttons";
import {ErrorResponse} from "types";
import Form from "components/forms/Form";

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
        <Form
            form={(
                <ConfirmKey
                    required
                    value={token}
                    errorMessages={errors?.detail}
                    onChange={value => setToken(value)}
                />
            )}
            actions={(
                <PrimaryButton type="submit">{t("E-Mail bestätigen")}</PrimaryButton>
            )}
            onSubmit={() => onVerify(token)}
        />
    );
};

EmailVerificationForm.defaultProps = {
    initialCode: "",
};

export default EmailVerificationForm;
