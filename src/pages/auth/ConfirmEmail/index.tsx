import React, {useContext, useEffect} from "react";
import {IConfirmEmailData, IConfirmEmailResponse, useSendConfirmEmailAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {generatePath, useHistory} from "react-router";

import {FocusedPage} from "../../../components";
import {UserContext} from "../../../contexts";

import Form from "./Form";


const ConfirmEmail = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const {code} = useParams<{
        code?: string;
    }>();
    const sendConfirmEmail = useSendConfirmEmailAPI();
    const {dispatch} = useContext(UserContext);

    const {
        mutate,
        mutateAsync,
    } = useMutation<IConfirmEmailResponse, AxiosError, IConfirmEmailData>(
        sendConfirmEmail,
        {
            onSuccess: () => {
                dispatch({
                    type: "verify-email",
                    payload: {},
                });
                history.push(generatePath("/auth/registration/fill/"));
            },
        },
    );

    useEffect(() => {
        if (typeof code === "string") {
            mutate({
                token: code,
            });
        }
    }, [code, mutate]);

    return (
        <FocusedPage title={t("E-Mail bestätigen")}>
            <Form
                onSubmit={(values, {setErrors, setSubmitting}) =>
                    mutateAsync(values)
                        .catch(error => setErrors(error.response?.data))
                        .finally(() => setSubmitting(false))
                }
            />
        </FocusedPage>
    );
};

export default ConfirmEmail;
