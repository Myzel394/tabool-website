import React, {memo, useContext, useEffect} from "react";
import {useMutation} from "react-query";
import {confirmEmail} from "api/auth";
import {LoadingOverlay} from "components/overlays";
import {useParams} from "react-router-dom";
import {UserContext} from "contexts";

import EmailVerificationForm from "./EmailVerificationForm";

export interface IEmailVerificationFormManager {
    onVerified: () => void;
}

const EmailVerificationFormManager = ({onVerified}: IEmailVerificationFormManager) => {
    const {code} = useParams();
    const {dispatch} = useContext(UserContext);
    const [mutate, {isLoading, error}] = useMutation(confirmEmail, {
        onSuccess: () => onVerified(),
    });
    const verifyCode = token => {
        dispatch({
            type: "verify-email",
            payload: {},
        });
        mutate({
            token,
        });
    };

    // If given code, verify it automatically
    useEffect(() => {
        verifyCode(code);
    }, [code]);

    return (
        <LoadingOverlay isLoading={isLoading}>
            <EmailVerificationForm initialCode={code} errors={error?.response?.data} onVerify={verifyCode} />
        </LoadingOverlay>
    );
};

export default memo(EmailVerificationFormManager);
