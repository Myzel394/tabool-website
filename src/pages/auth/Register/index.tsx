import {isExperimental} from "constants/dev";

import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import {IRegistrationData, IRegistrationResponse, useSendRegistrationAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {FocusedPage} from "components";
import {UserContext} from "contexts";
import {useHistory} from "react-router-dom";
import {buildPath} from "utils";

import Form from "./Form";


const Register = () => {
    const {t} = useTranslation();
    const sendRegistration = useSendRegistrationAPI();
    const history = useHistory();
    const {dispatch, state: user} = useContext(UserContext);

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

                if (isExperimental) {
                    history.push(buildPath("/auth/registration/fill/"));
                }
            },
        },
    );

    return (
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

export default Register;
