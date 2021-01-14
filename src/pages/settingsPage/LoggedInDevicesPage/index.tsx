import React, {memo, useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, CircularProgress, List, Paper} from "@material-ui/core";
import {IFetchSessionsResponse, useFetchSessionsAPI} from "hooks/apis";
import {useQuery} from "react-query";
import {useQueryOptions} from "hooks";
import {Alert} from "@material-ui/lab";
import {AxiosError} from "axios";
import {DefaultPage} from "components";
import {Session as SessionType} from "types";
import update from "immutability-helper";

import Area from "../Area";

import Session from "./Session";

interface SessionWithId extends SessionType {
    id: string;
}


const createId = (session: SessionType): string =>
    session.lastActivity.toISOString() + session.ip + session.userAgent + session.isThis;

const LoggedInDevicesPage = () => {
    const {t} = useTranslation();
    const fetchSessions = useFetchSessionsAPI();
    const queryOptions = useQueryOptions();

    const [sessions, setSessions] = useState<SessionWithId[]>([]);

    const {
        isLoading,
        error,
        isError,
    } = useQuery<IFetchSessionsResponse, AxiosError>(
        "fetch_sessions",
        fetchSessions,
        {
            ...queryOptions,
            onSuccess: response =>
                Promise.allSettled(
                    response.results.map(
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore: Type is changed
                        async (element: SessionWithId) => {
                            element.id = createId(element);
                            return element;
                        },
                    ),
                ).then(promiseResults => {
                    const results = promiseResults
                        .map(result => result.status === "fulfilled" && result.value)
                        .filter(Boolean);

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore: Filter already checks that there is no `false`
                    setSessions(results);
                }),
        },
    );


    return (
        <DefaultPage>
            <Area title={t("Angemeldete Geräte")}>
                <Paper>
                    {isLoading &&
                        <Box p={2} justifyContent="center" alignItems="center" display="flex">
                            <CircularProgress />
                        </Box>}
                    {isError &&
                        <Alert severity="error">
                            {error?.response?.data?.nonFieldErrors ?? t("Daten konnten nicht geladen werden.")}
                        </Alert> }
                    {sessions &&
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
                        </List>}
                </Paper>
            </Area>
        </DefaultPage>
    );
};

export default memo(LoggedInDevicesPage);
