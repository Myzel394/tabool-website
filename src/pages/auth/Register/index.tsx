import React, {memo, useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {IRegistrationData, IRegistrationResponse, useSendRegistrationAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {FocusedPage} from "components";
import {UserContext} from "contexts";

import Form from "./Form";
import Completed from "./Completed";


const Register = () => {
    const {t} = useTranslation();
    const sendRegistration = useSendRegistrationAPI();
    const {dispatch} = useContext(UserContext);

    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const {
        mutateAsync,
    } = useMutation<IRegistrationResponse, AxiosError, IRegistrationData>(
        sendRegistration,
        {
            onSuccess: (data) => {
                dispatch({
                    type: "registration",
                    payload: data,
                });
                setIsCompleted(true);
            },
        },
    );

    return isCompleted
        ? <Completed />
        : (
            <FocusedPage showLogo title={t("Registrieren")}>
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

export default memo(Register);
