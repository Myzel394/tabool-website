import React, {useContext, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@material-ui/core";
import {isMobile} from "react-device-detect";
import {ToolbarProps} from "react-big-calendar";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import {useDeviceWidth} from "hooks";
import {useTranslation} from "react-i18next";
import {FaCog} from "react-icons/all";
import {PrimaryButton} from "components";

import CalendarContext from "../../../../CalendarContext";

import Navigation from "./Navigation";
import ViewChanger from "./ViewChanger";
import TypeChanger from "./TypeChanger";
import ShowFreePeriods from "./ShowFreePeriods";
import Calendar from "./Calendar";
import ShowDetails from "./ShowDetails";


const Toolbar = ({label, onNavigate}: ToolbarProps) => {
    const {
        onCalendarPositionChange,
        isCalendarOpened,
        onCalendarOpenedChange,
    } = useContext(CalendarContext);
    const {t} = useTranslation();
    const {isMD} = useDeviceWidth();
    const [isOpen, setIsOpen] = useState<boolean>(isCalendarOpened);
    const elements = [
        !isMobile && <ViewChanger key="view_changer" />,
        <TypeChanger key="type_changer" />,
        <div key="switchers">
            <ShowFreePeriods />
            <ShowDetails />
        </div>,
    ];

    return (
        <>
            <Grid container direction="row" alignItems="center" justify="center">
                <Grid item>
                    <Navigation
                        label={label}
                        onNavigate={onNavigate}
                        onContextMenu={event => {
                            if (!isMobile) {
                                event.preventDefault();
                                setIsOpen(true);
                                onCalendarPositionChange({
                                    x: event.clientX,
                                    y: event.clientY,
                                });
                                onCalendarOpenedChange(true);
                            }
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button color="secondary" endIcon={<FaCog />} onClick={() => setIsOpen(true)}>
                        {t("Einstellungen")}
                    </Button>
                </Grid>
            </Grid>
            <MuiPickersUtilsProvider utils={DayjsUtils}>
                <Dialog open={isOpen} maxWidth="md" onBackdropClick={() => setIsOpen(false)}>
                    <DialogTitle>
                        {t("Einstellungen")}
                    </DialogTitle>
                    <DialogContent>
                        {isMD ? (
                            <Box display="flex" flexDirection="row">
                                <Calendar />
                                <Grid container spacing={1} direction="column" alignItems="center">
                                    {elements.map(element => (
                                        <Grid key={element === false ? "view_changer" : element.key} item>
                                            {element}
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        ) : (
                            <Grid container spacing={1} direction="column" alignItems="center">
                                {elements.map(element => (
                                    <Grid key={element === false ? "view_changer" : element.key} item>
                                        {element}
                                    </Grid>
                                ))}
                                <Grid item>
                                    <Box mt={5}>
                                        <Calendar />
                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <PrimaryButton onClick={() => setIsOpen(false)}>
                            {t("Schließen")}
                        </PrimaryButton>
                    </DialogActions>
                </Dialog>
            </MuiPickersUtilsProvider>
        </>
    );
};

export default Toolbar;
export * from "./TypeChanger";
export * from "./ViewChanger";
