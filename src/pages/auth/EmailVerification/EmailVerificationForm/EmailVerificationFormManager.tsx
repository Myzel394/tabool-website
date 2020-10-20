import React, {memo, useCallback, useEffect} from "react";
import {useMutation} from "react-query";
import {confirmEmail} from "api/auth";
import {LoadingOverlay} from "components/overlays";
import {useParams} from "react-router-dom";

import EmailVerificationForm from "./EmailVerificationForm";

export interface IEmailVerificationFormManager {
    onVerified: () => void;
}

const EmailVerificationFormManager = ({onVerified}: IEmailVerificationFormManager) => {
    const {code} = useParams();
    const [mutate, {isLoading, error}] = useMutation(confirmEmail, {
        onSuccess: () => onVerified(),
    });
    const verifyCode = useCallback(token => {
        mutate({
            token,
        });
    }, []);

    // If given code, verify it automatically
    useEffect(() => {
        verifyCode(code);
    }, [code]);

    return (
        <LoadingOverlay isLoading={isLoading}>
            <EmailVerificationForm initialCode={code} errors={error?.response.data} onVerify={verifyCode} />
        </LoadingOverlay>
    );
};

export default memo(EmailVerificationFormManager);
