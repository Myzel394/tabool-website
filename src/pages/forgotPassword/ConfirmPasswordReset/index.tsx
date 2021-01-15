import React, {useContext} from "react";
import {IConfirmPasswordResetData, useConfirmPasswordResetAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {FocusedPage} from "components";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {UserContext} from "contexts";

import Form from "./Form";


const ConfirmPasswordReset = () => {
    const {t} = useTranslation();
    const {dispatch} = useContext(UserContext);
    const history = useHistory();
    const updatePassword = useConfirmPasswordResetAPI();

    const {
        mutateAsync,
    } = useMutation<void, AxiosError, IConfirmPasswordResetData>(
        updatePassword,
        {
            onSuccess: () => {
                dispatch({
                    type: "logout",
                    payload: {},
                });
                history.goBack();
            },
        },
    );

    return (
        <FocusedPage title={t("Passwort")}>
            <Form
                onSubmit={(values, {setErrors, setSubmitting}) =>
                    mutateAsync(values)
                        .catch(error => {
                            if (error.response.status === 404) {
                                setErrors({
                                    token: t("Ungültiger Code."),
                                });
                            } else {
                                setErrors(error.response?.data);
                            }
                        })
                        .finally(() => setSubmitting(false))
                }
            />
        </FocusedPage>
    );
};

export default ConfirmPasswordReset;
