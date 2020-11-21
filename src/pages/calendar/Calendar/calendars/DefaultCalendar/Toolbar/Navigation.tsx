import {Tooltip} from "components";
import {Box, Button, ClickAwayListener, Grow, IconButton, Paper, useTheme} from "@material-ui/core";
import {navigate as navigationConstants} from "react-big-calendar/lib/utils/constants";
import {FaCaretLeft, FaCaretRight} from "react-icons/all";
import React, {useContext, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {ToolbarProps} from "react-big-calendar";
import {findNextDate} from "utils";
import DayjsUtils from "@date-io/dayjs";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

import CalendarContext from "../../../../CalendarContext";

export interface INavigation {
    label: ToolbarProps["label"];
    onNavigate: ToolbarProps["onNavigate"];
}

const WEEK_DAYS = [1, 2, 3, 4, 5];

const Navigation = ({label, onNavigate}: INavigation) => {
    const {earliestDateAvailable, latestDateAvailable, date, isCalendarOpened, onCalendarOpenedChange} = useContext(CalendarContext);
    const theme = useTheme();
    const {t} = useTranslation();
    const noDataAvailableText = t("Es gibt für diesen Zeitraum noch keine Daten").toString();
    const disablePrevious = earliestDateAvailable && !(
        findNextDate(
            date.subtract(6, "date"), 1,
        ).isAfter(earliestDateAvailable)
    );
    const disableNext = latestDateAvailable && !(
        findNextDate(
            date.subtract(6, "date"), 5,
        ).isBefore(latestDateAvailable)
    );
    const [value, setValue] = useState<any>(new Date());
    const [opened, setIsOpened] = useState<boolean>(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const contextMenuStyle = useMemo(() => ({
        position: "absolute" as "absolute",
        left: x,
        top: y,
        zIndex: theme.zIndex.appBar - 1,
    }), [theme.zIndex.appBar, x, y]);

    return (
        <>
            <Box flexDirection="row" display="flex">
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
                        onContextMenu={event => {
                            event.preventDefault();
                            setX(event.clientX);
                            setY(event.clientY);
                            setIsOpened(!opened);
                        }}
                    >
                        {label}
                    </Button>
                </Tooltip>
                <Tooltip title={disableNext ? noDataAvailableText : t("Weiter").toString()}>
                    <span>
                        <IconButton
                            disabled={disableNext} onClick={event => {
                                event.stopPropagation();
                                onNavigate(navigationConstants.NEXT);
                            }}
                        >
                            <FaCaretRight />
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>
            {opened && (
                <ClickAwayListener onClickAway={() => setIsOpened(false)}>
                    <Grow
                        in style={{
                            transformOrigin: "left top",
                        }}
                    >
                        <Paper style={contextMenuStyle} elevation={5}>
                            <MuiPickersUtilsProvider utils={DayjsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="static"
                                    format="L"
                                    value={value}
                                    minDate={earliestDateAvailable?.toDate()}
                                    maxDate={latestDateAvailable?.toDate()}
                                    shouldDisableDate={dateInstance => (dateInstance ? !WEEK_DAYS.includes(dateInstance.day()) : true)}
                                    onChange={val => setValue(val)}
                                />
                            </MuiPickersUtilsProvider>
                        </Paper>
                    </Grow>
                </ClickAwayListener>
            )}
        </>
    );
};

export default Navigation;
