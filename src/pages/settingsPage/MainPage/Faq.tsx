import React, {memo} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Link, Paper, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {FaExternalLinkAlt} from "react-icons/all";


const Faq = () => {
    const {t} = useTranslation();

    return (
        <Paper>
            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1">
                        {t("Können Lehrer meine Daten sehen?")}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>
                        <Typography variant="body2" color="textSecondary">
                            {t("tabool gibt keine Daten an die Schule weiter. Dies wird nur im Notfall, bei " +
                                "strafrechtlicher Verfolgung getan, sofern es auch zwingend notwendig ist. ")}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="textSecondary">
                            {t("Jedoch haben wir keinen Einfluss darauf, was Scooso an die Schule weiter gibt. " +
                                "Darum kannst du auch beispielsweise Hausaufgaben verzögert hochladen und deine persönliche Daten " +
                                "werden von Dateien automatisch entfernt, damit die Datenmenge bei Scooso so klein wie möglich ist.")}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="textSecondary">
                            {t("Für eine genauere Erklärung, schau dir die Datenschutzerklärung an.")}
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1">
                        {t("Ist tabool sicher?")}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>
                        <Typography variant="body2" color="textSecondary">
                            {t("Bei der Programmierung von tabool war das Hauptkriterium Sicherheit. " +
                                "Wir halten uns an internationale Sicherheitsstandards und updaten die App regelmäßig. " +
                                "Durch automatisiertes Testen können wir die Sicherheit bestätigen.")}
                        </Typography>
                        <br />
                        <Link
                            href="https://github.com/Myzel394/tabool-website"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {t("Außerdem ist tabools Code auch öffentlich abrufbar - du kannst also genau nachlesen, " +
                                "was eigentlich mit deinen Daten passiert.")}
                            <FaExternalLinkAlt />
                        </Link>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
};

export default memo(Faq);
