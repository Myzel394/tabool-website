import React, {memo} from "react";
import {useTranslation} from "react-i18next";
import {IRegistrationData, IRegistrationResponse, useSendRegistrationAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {FocusedPage} from "components";

import Form from "./Form";
import Completed from "./Completed";


const Register = () => {
    const {t} = useTranslation();
    const sendRegistration = useSendRegistrationAPI();

    const {
        mutateAsync,
        isSuccess,
    } = useMutation<IRegistrationResponse, AxiosError, IRegistrationData>(
        sendRegistration,
    );

    return isSuccess
        ? <Completed />
        : (
            <FocusedPage showLogo title={t("Registrieren")}>
                <Form
                    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                    // @ts-ignore: Password confirmation field can be ignored
                    onSubmit={(values, {setErrors}) =>
                        mutateAsync(values)
                            .catch(error => setErrors(error.response?.data))
                    }
                />
            </FocusedPage>
        );
};

export default memo(Register);
