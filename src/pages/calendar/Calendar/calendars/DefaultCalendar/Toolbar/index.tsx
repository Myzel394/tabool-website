import React, {useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Container, Grid, Typography} from "@material-ui/core";
import {isMobile} from "react-device-detect";
import {useDeviceWidth} from "hooks";
import {useTranslation} from "react-i18next";
import {FaCog} from "react-icons/all";
import {ToolbarProps} from "react-big-calendar";

import Navigation from "./Navigation";
import ViewChanger from "./ViewChanger";
import TypeChanger from "./TypeChanger";
import ShowFreePeriods from "./ShowFreePeriods";

const Toolbar = ({label, onNavigate}: ToolbarProps) => {
    const {t} = useTranslation();
    const {isMD} = useDeviceWidth();
    const [isExpanded, setIsExpanded] = useState<boolean>(!isMobile);

    return (
        <Container maxWidth="lg">
            <Box my={2}>
                <Accordion expanded={isExpanded} onClick={() => setIsExpanded(prevState => !prevState)}>
                    <AccordionSummary expandIcon={<FaCog />}>
                        <Typography>{t("Einstellungen")}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid
                            container
                            spacing={4}
                            direction={isMD ? "row" : "column"}
                            alignItems="center"
                            onClick={event => event.stopPropagation()}
                            onFocus={event => event.stopPropagation()}
                        >
                            <Navigation
                                label={label}
                                onNavigate={onNavigate}
                            />
                            {!isMobile && (
                                <Grid item>
                                    <ViewChanger />
                                </Grid>
                            )}
                            <Grid item>
                                <TypeChanger />
                            </Grid>
                            <Grid item>
                                <ShowFreePeriods />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>
    );
};

export default Toolbar;
export * from "./TypeChanger";
export * from "./ViewChanger";
