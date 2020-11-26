import {Tooltip} from "components";
import {Box, Button, ButtonProps, IconButton} from "@material-ui/core";
import {navigate as navigationConstants} from "react-big-calendar/lib/utils/constants";
import {FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight} from "react-icons/all";
import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import {ToolbarProps} from "react-big-calendar";
import {isMobile} from "react-device-detect";

import CalendarContext from "../../../../CalendarContext";

export interface INavigation extends ButtonProps {
    label: ToolbarProps["label"];
    onNavigate: ToolbarProps["onNavigate"];
}

const Navigation = ({label, onNavigate, ...other}: INavigation) => {
    const {
        earliestDateAvailable,
        latestDateAvailable,
        date,
        onDateChange,
        activeView,
    } = useContext(CalendarContext);
    const {t} = useTranslation();
    const isDayView = activeView === "day";
    const noDataAvailableText = t("Es gibt für diesen Zeitraum noch keine Daten").toString();
    const disablePreviousWeek = earliestDateAvailable && !(
        date.subtract(6, "day").isAfter(earliestDateAvailable)
    );
    const disableNextWeek = latestDateAvailable && !(
        date.add(6, "day").isBefore(latestDateAvailable)
    );
    const disablePrevious = isDayView ? earliestDateAvailable && !(
        date.isAfter(earliestDateAvailable)
    ) : disablePreviousWeek;
    const disableNext = isDayView ? latestDateAvailable && !(
        date.isBefore(latestDateAvailable)
    ) : disableNextWeek;

    return (
        <Box flexDirection="row" display="flex" justifyContent="center">
            {isMobile && isDayView && (
                <Tooltip title={disablePreviousWeek ? noDataAvailableText : t("Springe eine Woche zurück").toString()}>
                    <span>
                        <IconButton
                            disabled={disablePreviousWeek}
                            onClick={event => {
                                event.stopPropagation();
                                onDateChange(date.subtract(7, "day"));
                            }}
                        >
                            <FaAngleDoubleLeft />
                        </IconButton>
                    </span>
                </Tooltip>
            )}
            <Tooltip title={disablePrevious ? noDataAvailableText : t("Zurück").toString()}>
                <span>
                    <IconButton
                        disabled={disablePrevious}
                        onClick={event => {
                            event.stopPropagation();
                            onNavigate(navigationConstants.PREVIOUS);
                        }}
                    >
                        <FaAngleLeft />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title={t("Heute").toString()}>
                <Button
                    color="default"
                    onClick={event => {
                        event.stopPropagation();
                        onNavigate(navigationConstants.TODAY);
                    }}
                    {...other}
                >
                    {label}
                </Button>
            </Tooltip>
            <Tooltip title={disableNext ? noDataAvailableText : t("Weiter").toString()}>
                <span>
                    <IconButton
                        disabled={disableNext}
                        onClick={event => {
                            event.stopPropagation();
                            onNavigate(navigationConstants.NEXT);
                        }}
                    >
                        <FaAngleRight />
                    </IconButton>
                </span>
            </Tooltip>
            {isMobile && isDayView && (
                <Tooltip title={disableNextWeek ? noDataAvailableText : t("Springe eine Woche weiter").toString()}>
                    <span>
                        <IconButton
                            disabled={disableNextWeek}
                            onClick={event => {
                                event.stopPropagation();
                                onDateChange(date.add(7, "day"));
                            }}
                        >
                            <FaAngleDoubleRight />
                        </IconButton>
                    </span>
                </Tooltip>
            )}
        </Box>
    );
};

export default Navigation;
