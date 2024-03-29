import React from "react";
import {useTranslation} from "react-i18next";
import {IChangePasswordData, useChangePasswordAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useHistory} from "react-router-dom";
import {Box} from "@material-ui/core";
import {DefaultPage} from "components";
import {buildPath} from "utils";

import Area from "../Area";

import Form from "./Form";

const PasswordResetPage = () => {
    const {t} = useTranslation();
    const changePassword = useChangePasswordAPI();
    const history = useHistory();

    const {
        mutateAsync,
    } = useMutation<void, AxiosError, IChangePasswordData>(
        changePassword,
        {
            onSuccess: () => history.push(buildPath("/settings")),
        },
    );

    return (
        <DefaultPage>
            <Area title={t("Passwort zurücksetzen")}>
                <Box p={2}>
                    <Form
                        onSubmit={({oldPassword, newPassword}, {setErrors, setSubmitting}) =>
                            mutateAsync({
                                oldPassword,
                                newPassword,
                            })
                                .catch(error => setErrors(error.response?.data))
                                .finally(() => setSubmitting(false))
                        }
                    />
                </Box>
            </Area>
        </DefaultPage>
    );
};

export default PasswordResetPage;
