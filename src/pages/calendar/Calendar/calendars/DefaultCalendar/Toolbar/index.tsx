import React from "react";
import {Box, Container, Grid} from "@material-ui/core";
import {NavigateAction, View} from "react-big-calendar";
import {isMobile} from "react-device-detect";

import Navigation from "./Navigation";
import ViewChanger from "./ViewChanger";
import TypeChanger, {CalendarType} from "./TypeChanger";
import ShowFreePeriods from "./ShowFreePeriods";

export interface IToolbar {
    onViewChange: (newValue: View) => any;
    onCalendarTypeChange: (newType: CalendarType) => any;
    onNavigate: (newNavigation: NavigateAction) => any;
    onShowFreePeriodsChange: (value: boolean) => any;

    calendarType: CalendarType;
    label: string;
    view: View;
    showFreePeriods: boolean;
}

const Toolbar = ({
    onNavigate,
    label,
    onViewChange,
    view,
    calendarType,
    onCalendarTypeChange,
    onShowFreePeriodsChange,
    showFreePeriods,
}: IToolbar) => {
    return (
        <Container maxWidth="md">
            <Box my={2}>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    alignItems="center"
                >
                    <Grid item>
                        <Navigation label={label} onNavigate={onNavigate} />
                    </Grid>
                    {!isMobile && (
                        <Grid item>
                            <ViewChanger activeView={view} onChange={onViewChange} />
                        </Grid>
                    )}
                    <Grid item>
                        <TypeChanger activeType={calendarType} onChange={onCalendarTypeChange} />
                    </Grid>
                    <Grid item>
                        <ShowFreePeriods
                            value={showFreePeriods}
                            disabled={calendarType !== "lesson"}
                            onChange={onShowFreePeriodsChange}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

const proxyToolbar = (extraProps: {
    onViewChange: (newValue: View) => any;
    onCalendarTypeChange: (newType: CalendarType) => any;
    calendarType: CalendarType;
    showFreePeriods: boolean;
    onShowFreePeriodsChange: (value: boolean) => any;
}) => props => Toolbar({
    ...props,
    ...extraProps,
});

export default proxyToolbar;
export * from "./TypeChanger";
export * from "./ViewChanger";
