import React, {useMemo, useState} from "react";
import {IFetchAbsenceListData, IFetchAbsenceListResult, useFetchAbsenceListAPI} from "hooks/apis";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {useQueryOptions} from "hooks";
import {DefaultPage, ErrorPage, LoadingPage, stickyHeaderStyles} from "components";
import {useTranslation} from "react-i18next";
import {Box, CircularProgress, FormControlLabel, List, ListSubheader, Paper, Switch} from "@material-ui/core";
import {getPerDate} from "utils";
import dayjs, {Dayjs} from "dayjs";
import {Absence as AbsenceType} from "types";
import update from "immutability-helper";
import {Alert} from "@material-ui/lab";

import Calendar from "./Calendar";
import Absence from "./Absence";

const style = {
    width: "100%",
};

const AbsenceList = () => {
    const fetchAbsences = useFetchAbsenceListAPI();
    const queryOptions = useQueryOptions();
    const {t} = useTranslation();
    const classes = stickyHeaderStyles();

    const [absences, setAbsences] = useState<AbsenceType[]>();
    const [excludeSigned, setExcludeSigned] = useState<boolean>(false);
    const [excludeWithReason, setExcludeWithReason] = useState<boolean>(false);
    const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs);

    const {
        isError,
        isLoading,
    } = useQuery<IFetchAbsenceListResult, AxiosError, IFetchAbsenceListData>(
        ["fetch_absences", currentMonth, excludeSigned, excludeWithReason],
        () => fetchAbsences({
            lessonDateMin: currentMonth.date(1),
            lessonDateMax: currentMonth.date(currentMonth.daysInMonth()),
            isSigned: excludeSigned ? false : undefined,
            containsReason: excludeWithReason ? false : undefined,
        }),
        {
            ...queryOptions,
            onSuccess: result => setAbsences(result.results),
        },
    );

    const absencesPerDate: [string, AbsenceType[]][] = useMemo(() => {
        if (!absences) {
            return [];
        }

        const perDate = getPerDate(absences, {
            getValue: absence => absence.lesson.date.toISOString(),
        });
        const filtered = Object.entries(perDate).filter(([x, value]) => Boolean(value.length));

        return filtered;
    }, [absences]);

    if (isLoading && !absences) {
        return (
            <LoadingPage title={t("Fehlstunden werden geladen")} />
        );
    }

    if (isError && !absences) {
        return (
            <ErrorPage description={t("Fehlstunden konnten nicht geladen werden.")} />
        );
    }

    const updateAbsence = (absenceId: string, newAbsence: AbsenceType) => {
        if (!absences) {
            return;
        }

        const index = absences.findIndex(absence => absence.id === newAbsence.id);

        return setAbsences(prevState => update(prevState, {
            [index]: {
                $set: newAbsence,
            },
        }));
    };

    return (
        <DefaultPage>
            <Paper style={style}>
                {absences &&
                <>
                    <Calendar absences={absences} date={currentMonth} onDateChange={setCurrentMonth} />
                    <Box my={2} px={2}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={excludeSigned}
                                    onChange={event => setExcludeSigned(event.target.checked)}
                                />
                            }
                            label={t("Unterschriebene Fehlstunden ausblenden")}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={excludeWithReason}
                                    onChange={event => setExcludeWithReason(event.target.checked)}
                                />
                            }
                            label={t("Fehlstunden nur mit leerem Grund anzeigen")}
                        />
                    </Box>
                    <Box mt={2} alignItems="center" justifyContent="center" display="flex">
                        {isLoading && <CircularProgress />}
                        {isError &&
                        <Alert severity="error">
                            {t("Weitere Fehlstunden konnten nicht geladen werden.")}
                        </Alert>}
                    </Box>
                    <List subheader={<li />} className={classes.root}>
                        {absencesPerDate.map(([date, absences], index) =>
                            <Box key={date} component="li" mt={5 * Number(!index)}>
                                <ul>
                                    <ListSubheader>
                                        {dayjs(date).format("ll")}
                                    </ListSubheader>
                                    {absences.map(absence =>
                                        <Absence
                                            {...absence}
                                            key={absence.id}
                                            onUpdate={newAbsence => updateAbsence(absence.id, newAbsence)}
                                        />)}
                                </ul>
                            </Box>)}
                    </List>
                </>}
            </Paper>
        </DefaultPage>
    );
};

export default AbsenceList;
