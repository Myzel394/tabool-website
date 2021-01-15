import React from "react";
import {IRequestPasswordResetData, useRequestPasswordResetAPI} from "hooks/apis";
import {FocusedPage} from "components";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useTranslation} from "react-i18next";

import Form from "./Form";
import Done from "./Done";


const RequestPasswordToken = () => {
    const {t} = useTranslation();
    const requestToken = useRequestPasswordResetAPI();

    const {
        mutateAsync,
        isSuccess,
    } = useMutation<void, AxiosError, IRequestPasswordResetData>(
        requestToken,
    );

    return (
        <FocusedPage title={t("Passwort zurücksetzen")}>
            {isSuccess
                ? <Done />
                : (
                    <Form
                        onSubmit={(values, {setErrors, setSubmitting}) =>
                            mutateAsync(values)
                                .catch(error => setErrors(error.response?.data))
                                .finally(() => setSubmitting(false))
                        }
                    />
                )
            }
        </FocusedPage>
    );
};

export default RequestPasswordToken;
