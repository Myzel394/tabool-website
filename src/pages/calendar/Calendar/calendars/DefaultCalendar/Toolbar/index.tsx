import React from "react";
import {Box, Container} from "@material-ui/core";
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
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                m="auto"
                width="fit-content"
            >
                <Box
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                    my={2}
                >
                    <Navigation label={label} onNavigate={onNavigate} />
                </Box>
                <Box display="flex" flexDirection="row">
                    {!isMobile && <ViewChanger activeView={view} onChange={onViewChange} />}
                </Box>
                <Box>
                    <TypeChanger activeType={calendarType} onChange={onCalendarTypeChange} />
                </Box>
                <Box>
                    <ShowFreePeriods value={showFreePeriods} onChange={onShowFreePeriodsChange} />
                </Box>
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
