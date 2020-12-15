import React, {memo, useCallback, useContext, useEffect} from "react";
import {useMutation} from "react-query";
import {LoadingOverlay} from "components/overlays";
import {useParams} from "react-router-dom";
import {UserContext} from "contexts";
import {IConfirmEmailData, IConfirmEmailResponse, useSendConfirmEmailAPI} from "hooks/apis/send";
import {AxiosError} from "axios";

import EmailVerificationForm from "./EmailVerificationForm";

export interface IEmailVerificationFormManager {
    onVerified: () => void;
}

const EmailVerificationFormManager = ({onVerified}: IEmailVerificationFormManager) => {
    const {code} = useParams<{
        code: string;
    }>();
    const {dispatch} = useContext(UserContext);
    const sendConfirmEmail = useSendConfirmEmailAPI();
    const [
        mutate,
        {
            isLoading,
            error,
        }] = useMutation<IConfirmEmailResponse, AxiosError, IConfirmEmailData>(
            sendConfirmEmail,
            {
                onSuccess: () => onVerified(),
            },
        );
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
        if (code !== undefined && code !== "") {
            verifyCode(code);
        }
    }, [code, verifyCode]);

    return (
        <LoadingOverlay isLoading={isLoading}>
            <EmailVerificationForm initialCode={code} errors={error?.response?.data} onVerify={verifyCode} />
        </LoadingOverlay>
    );
};

export default memo(EmailVerificationFormManager);
