import {Tooltip} from "components";
import {Box, Button, ButtonProps, IconButton} from "@material-ui/core";
import {navigate as navigationConstants} from "react-big-calendar/lib/utils/constants";
import {FaCaretLeft, FaCaretRight} from "react-icons/all";
import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import {ToolbarProps} from "react-big-calendar";
import {findNextDate} from "utils";

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
    } = useContext(CalendarContext);
    const {t} = useTranslation();
    const noDataAvailableText = t("Es gibt für diesen Zeitraum noch keine Daten").toString();
    const disablePrevious = earliestDateAvailable && !(
        date.isAfter(earliestDateAvailable)
    );
    const disableNext = latestDateAvailable && !(
        findNextDate(
            date.add(1, "day"), 5,
        ).subtract(1, "day").isBefore(latestDateAvailable)
    );

    return (
        <Box flexDirection="row" display="flex" justifyContent="center">
            <Tooltip title={disablePrevious ? noDataAvailableText : t("Zurück").toString()}>
                <span>
                    <IconButton
                        disabled={disablePrevious} onClick={event => {
                            event.stopPropagation();
                            onNavigate(navigationConstants.PREVIOUS);
                        }}
                    >
                        <FaCaretLeft />
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
                        <FaCaretRight />
                    </IconButton>
                </span>
            </Tooltip>
        </Box>
    );
};

export default Navigation;
