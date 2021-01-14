import React from "react";
import {useTranslation} from "react-i18next";
import {IChangePasswordData, useChangePasswordAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useHistory} from "react-router-dom";
import {generatePath} from "react-router";
import {Box, Paper} from "@material-ui/core";
import {DefaultPage} from "components";

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
            onSuccess: () => history.push(generatePath("/settings")),
        },
    );

    return (
        <DefaultPage>
            <Area title={t("Passwort zurücksetzen")}>
                <Paper>
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
                </Paper>
            </Area>
        </DefaultPage>
    );
};

export default PasswordResetPage;
