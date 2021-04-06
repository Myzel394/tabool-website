import React, {memo, useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, CircularProgress, List} from "@material-ui/core";
import {IFetchSessionsResponse, useFetchSessionsAPI} from "hooks/apis";
import {useQuery} from "react-query";
import {useQueryOptions} from "hooks";
import {Alert} from "@material-ui/lab";
import {AxiosError} from "axios";
import {DefaultPage} from "components";
import update from "immutability-helper";
import {Session as SessionType} from "types";

import Area from "../Area";

import Session from "./Session";

const LoggedInDevicesPage = () => {
    const {t} = useTranslation();
    const fetchSessions = useFetchSessionsAPI();
    const queryOptions = useQueryOptions();

    const [sessions, setSessions] = useState<SessionType[]>([]);

    const {
        isLoading,
        error,
        isError,
    } = useQuery<IFetchSessionsResponse, AxiosError>(
        "fetch_sessions",
        fetchSessions,
        {
            ...queryOptions,
            onSuccess: response => setSessions(response.results),
        },
    );

    return (
        <DefaultPage>
            <Area title={t("Angemeldete Geräte")}>
                {isLoading && (
                    <Box p={2} justifyContent="center" alignItems="center" display="flex">
                        <CircularProgress />
                    </Box>
                )}
                {isError && (
                    <Alert severity="error">
                        {error?.response?.data?.nonFieldErrors ?? t("Daten konnten nicht geladen werden.")}
                    </Alert>
                )}
                {sessions.length > 0 && (
                    <List>
                        {sessions.map(session =>
                            <Session
                                key={session.id}
                                {...session}
                                onDelete={() => setSessions(prevState => update(prevState, {
                                    $splice: [
                                        [prevState.findIndex(element => element.id === session.id), 1],
                                    ],
                                }))}
                            />)}
                    </List>
                )}
            </Area>
        </DefaultPage>
    );
};

export default memo(LoggedInDevicesPage);
