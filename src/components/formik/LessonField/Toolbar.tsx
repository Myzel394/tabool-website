import React, {useContext, useMemo} from "react";
import {Box, Button, IconButton, Paper} from "@material-ui/core";
import {ToolbarProps} from "react-big-calendar";
import {FaAngleLeft, FaAngleRight} from "react-icons/all";
import {navigate as navigationConstants} from "react-big-calendar/lib/utils/constants";
import dayjs, {Dayjs} from "dayjs";
import {findNextDate, replaceDatetime} from "utils";
import {useTranslation} from "react-i18next";

import LessonFieldContext from "./LessonFieldContext";

const getNextMonday = (date: Dayjs) =>
    findNextDate(
        date.add(1, "day"),
        1,
    );

const getLastFriday = (date: Dayjs) =>
    findNextDate(
        date.subtract(7, "day"),
        5,
    );


const Toolbar = ({
    onNavigate,
}: ToolbarProps): JSX.Element => {
    const {t} = useTranslation();
    const {
        activeDate,
        disableNavigation,
        allowedMaxDate,
        allowedMinDate,
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
                        disabled={disableNavigation || disablePrevious}
                        onClick={() => onNavigate(navigationConstants.PREVIOUS)}
                    >
                        <FaAngleLeft />
                    </IconButton>
                    <Button
                        disabled={(allowedMinDate && allowedMinDate.isAfter(dayjs())) || (allowedMaxDate && allowedMaxDate.isBefore(dayjs()))}
                        onClick={() => onNavigate(navigationConstants.TODAY)}
                    >
                        {t("{{startDate}} - {{endDate}}", {
                            startDate: startDate.format("ll"),
                            endDate: endDate.format("ll"),
                        })}
                    </Button>
                    <IconButton
                        disabled={disableNavigation || disableNext}
                        onClick={() => onNavigate(navigationConstants.NEXT)}
                    >
                        <FaAngleRight />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
};


export default Toolbar;
