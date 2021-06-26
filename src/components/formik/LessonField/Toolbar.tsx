import React, {useContext, useMemo} from "react";
import {Box, Button, IconButton, Paper} from "@material-ui/core";
import {FaAngleLeft, FaAngleRight} from "react-icons/all";
import dayjs, {Dayjs} from "dayjs";
import {findNextDate, replaceDatetime} from "utils";
import {useTranslation} from "react-i18next";

import LessonFieldContext from "./LessonFieldContext";

const getNextMonday = (date: Dayjs) =>
    findNextDate(
        date.add(1, "day"),
        1,
    );

const getLastMonday = (date: Dayjs) =>
    findNextDate(
        date,
        1,
    );

const getLastFriday = (date: Dayjs) =>
    findNextDate(
        date.subtract(7, "day"),
        5,
    );


const Toolbar = (): JSX.Element => {
    const {t} = useTranslation();
    const {
        activeDate,
        disableNavigation,
        allowedMaxDate,
        allowedMinDate,
        onActiveDateChange,
    } = useContext(LessonFieldContext);
    const [disablePrevious, disableNext] = useMemo(() => {
        const date = dayjs(activeDate);
        const nextMonday = replaceDatetime(getNextMonday(date), "time");
        const lastFriday = replaceDatetime(getLastFriday(date), "time");

        return [
            allowedMinDate && nextMonday.isBefore(allowedMinDate),
            allowedMaxDate && lastFriday.isAfter(allowedMaxDate),
        ];
    }, [allowedMinDate, allowedMaxDate, activeDate]);
    const startDate = dayjs(activeDate);
    const endDate = findNextDate(startDate, 5);

    return (
        <Paper>
            <Box p={2}>
                <Box flexDirection="row" display="flex" justifyContent="center">
                    <IconButton
                        disabled={disablePrevious}
                        onClick={() => onActiveDateChange(getLastMonday(dayjs(activeDate).subtract(7, "day")).toDate())}
                    >
                        <FaAngleLeft />
                    </IconButton>
                    <Button
                        disabled={(allowedMinDate && allowedMinDate.isAfter(dayjs())) || (allowedMaxDate && allowedMaxDate.isBefore(dayjs()))}
                        onClick={() => onActiveDateChange(getLastMonday(dayjs()).toDate())}
                    >
                        {t("{{startDate}} - {{endDate}}", {
                            startDate: startDate.format("ll"),
                            endDate: endDate.format("ll"),
                        })}
                    </Button>
                    <IconButton
                        disabled={disableNavigation || disableNext}
                        onClick={() => onActiveDateChange(getNextMonday(dayjs(activeDate)).toDate())}
                    >
                        <FaAngleRight />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
};


export default Toolbar;
