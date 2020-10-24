import React, {memo, useCallback, useContext, useEffect} from "react";
import {useMutation} from "react-query";
import {sendConfirmEmail} from "api/auth";
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
    const [mutate, {isLoading, error}] = useMutation(sendConfirmEmail, {
        onSuccess: () => onVerified(),
    });
    const verifyCode = useCallback(token => {
        dispatch({
            type: "verify-email",
            payload: {},
        });
        mutate({
            token,
        });
    }, [dispatch, mutate]);

    // If given code, verify it automatically
    useEffect(() => {
        verifyCode(code);
    }, [code, verifyCode]);

    return (
        <LoadingOverlay isLoading={isLoading}>
            <EmailVerificationForm initialCode={code} errors={error?.response?.data} onVerify={verifyCode} />
        </LoadingOverlay>
    );
};

export default memo(EmailVerificationFormManager);
