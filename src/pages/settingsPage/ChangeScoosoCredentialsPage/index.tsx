import React from "react";
import {DefaultPage} from "components";
import {useTranslation} from "react-i18next";
import {
    IFetchScoosoCredentialsResponse,
    IUpdateScoosoCredentialsData,
    useFetchScoosoCredentialsAPI,
    useUpdateScoosoCredentialsAPI,
} from "hooks/apis";
import {useMutation, useQuery} from "react-query";
import {AxiosError} from "axios";
import {useQueryOptions} from "hooks";
import {useHistory} from "react-router-dom";
import {Box, Paper} from "@material-ui/core";

import Area from "../Area";

import Form from "./Form";

const ChangeScoosoCredentialsPage = () => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const history = useHistory();
    const fetchScoosoCredentials = useFetchScoosoCredentialsAPI();
    const updateScoosoCredentials = useUpdateScoosoCredentialsAPI();

    const {
        data,
    } = useQuery<IFetchScoosoCredentialsResponse, AxiosError, void>(
        "fetch_credentials",
        fetchScoosoCredentials,
        queryOptions,
    );

    const {
        mutateAsync,
    } = useMutation<void, AxiosError, IUpdateScoosoCredentialsData>(
        updateScoosoCredentials,
        {
            onSuccess: () => history.goBack(),
        },
    );

    return (
        <DefaultPage>
            <Area title={t("Scooso-Daten ändern")}>
                <Paper>
                    <Box p={2}>
                        <Form
                            username={data?.username}
                            onSubmit={(values, {setErrors, setSubmitting}) =>
                                mutateAsync(values)
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

export default ChangeScoosoCredentialsPage;
