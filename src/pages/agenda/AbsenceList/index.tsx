import React, {useMemo, useState} from "react";
import {IFetchAbsenceListData, IFetchAbsenceListResult, useFetchAbsenceListAPI} from "hooks/apis";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {useQueryOptions} from "hooks";
import {DefaultPage, ErrorPage, LoadingPage} from "components";
import {useTranslation} from "react-i18next";
import {Box, CircularProgress, FormControlLabel, List, makeStyles, Paper, Switch} from "@material-ui/core";
import {getPerDate} from "utils";
import dayjs, {Dayjs} from "dayjs";
import {Absence as AbsenceType} from "types";
import update from "immutability-helper";
import {Alert} from "@material-ui/lab";

import Calendar from "./Calendar";
import DateList from "./DateList";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
}));

const style = {
    width: "100%",
};

const AbsenceList = () => {
    const fetchAbsences = useFetchAbsenceListAPI();
    const queryOptions = useQueryOptions();
    const {t} = useTranslation();
    const classes = useStyles();

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
            reasonIsNull: excludeWithReason ? true : undefined,
        }),
        {
            ...queryOptions,
            onSuccess: result => setAbsences(result.results),
        },
    );

    const absencesPerDate: Record<string, AbsenceType[]> = useMemo(() => {
        if (!absences) {
            return {};
        }

        return getPerDate(absences, {
            getIsoDate: absence => absence.lesson.date.toISOString(),
        });

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
                        {Object.entries(absencesPerDate).map(([date, absences], index) =>
                            (absences.length ? (
                                <DateList
                                    key={date}
                                    absences={absences}
                                    isFirst={!index}
                                    date={dayjs(date)}
                                    onUpdate={updateAbsence}
                                />
                            ) : null))}
                    </List>
                </>}
            </Paper>
        </DefaultPage>
    );
};

export default AbsenceList;
