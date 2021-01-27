import React from "react";
import {FocusedPage, PrimaryButton} from "components";
import {Box, List, Typography} from "@material-ui/core";
import {
    FaBolt,
    FaEyeSlash,
    FaGraduationCap,
    FaMoon,
    FaShippingFast,
    FaSignal,
    FiLogIn,
    MdAirplanemodeActive,
    MdNotifications,
    MdSecurity,
    MdTimelapse,
} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {buildPath} from "utils";

import Element from "./Element";

const style = {
    fontWeight: "bold" as "bold",
};

const LandingPage = () => {
    const {t} = useTranslation();

    return (
        <FocusedPage disableBackButton showLogo title="tabool">
            <Box textAlign="center" my={3}>
                <Typography variant="h4" color="textSecondary" style={style}>
                    {t("Warum solltest du tabool benutzen?")}
                </Typography>
            </Box>
            <List>
                <Element icon={FaGraduationCap} title={t("Die App ist von uns")}>
                    <Box>
                        <Typography variant="body2" color="textSecondary">
                            {t("tabool ist von uns Schülern entwickelt. Wir werden die App für unsere Bedürfnisse anpassen " +
                                "und unsere Wünsche verwirklichen.")}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="textSecondary">
                            {t("Dabei wird tabool so fair wie möglich alle behandeln. Es wird keine Werbung für " +
                                "Schülervertretungen geben, es wird keine Umfragen seitens der Lehrer erscheinen oder sonst " +
                                "irgendetwas, welches eine bestimme Partei bevorzugen oder vernachlässigen kann.")}
                        </Typography>
                    </Box>
                </Element>
                <Element icon={MdNotifications} title={t("Benachrichtigungen bei Änderungen")}>
                    <Typography variant="body2" color="textSecondary">
                        {t("Du erhälst automatisch Benachrichtigungen wenn Hausaufgaben hinzugefügt werden, " +
                            "Stunden ausfallen, Veränderungen stattfinden, etc....")}
                    </Typography>
                </Element>
                <Element icon={MdSecurity} title={t("Sicherheit steht an erster Stelle")}>
                    <Typography variant="body2" color="textSecondary">
                        {t("Bei der Entwicklung von tabool steht Sicherheit an erster Stelle. " +
                            "Wir halten uns an internationale Sicherheitsstandards und gehen sorgfältig mit deinen Daten um. " +
                            "Ein Hackerangriff ist so gut wie nicht möglich.")}
                    </Typography>
                </Element>
                <Element icon={FaShippingFast} title={t("Superschnelle App")}>
                    <Typography variant="body2" color="textSecondary">
                        {t("tabool lädt in kürzester Zeit und ruckelt so wenig wie möglich.")}
                    </Typography>
                </Element>
                <Element icon={MdAirplanemodeActive} title={t("Offline verfügbar")}>
                    <Typography variant="body2" color="textSecondary">
                        {t("Deine Daten werden bei einer WLan-Verbindung im Hintergrund automatisch runtergeladen und gespeichert. " +
                            "Du brauchst also nicht mehr durchgehend mit dem Internet verbunden sein.")}
                    </Typography>
                </Element>
                <Element icon={FaSignal} title={t("Sauwenig mobile Daten")}>
                    <Box>
                        <Typography variant="body2" color="textSecondary">
                            {t("Du lädst nur das herunter, was du wirklich brauchst - nicht mehr und nicht weniger.")}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="textSecondary">
                            {t("Du möchtest Hausaufgaben schnell mit mobilen Daten hochladen? " +
                                "Einfach automatisch komprimieren lassen und bis zu 80% Daten sparen.")}
                        </Typography>
                    </Box>
                </Element>
                <Element icon={MdTimelapse} title={t("Hausaufgaben verzögert hochladen")}>
                    <Typography variant="body2" color="textSecondary">
                        {t("Du hast eine Hausaufgabe gemacht und musst sie innerhalb einer bestimmten Zeit abgeben? " +
                            "Aber du bist dir nicht ganz sicher, vielleicht möchtest du noch was verändern? " +
                            "Einfach deine Hausaufgabe auf tabool hochladen, angeben wann sie hochgeladen werden soll, " +
                            "und der Rest wird übernommen! Die Datei wird automatisch zu deiner gewünschten Zeit auf Scooso " +
                            "hochgeladen und kann jederzeit von dir abgebrochen oder verändert werden.")}
                    </Typography>
                </Element>
                <Element icon={FiLogIn} title={t("Kein lästiges Anmelden")}>
                    <Typography variant="body2" color="textSecondary">
                        {t("Du brauchst dich nur einmal anzumelden und das war's. ")}
                    </Typography>
                </Element>
                <Element icon={FaMoon} title={t("Dark-Mode verfügbar")}>
                    <Typography variant="body2" color="textSecondary">
                        {t("tabool bietet dir 4 verschiedene Modi an:")}
                        <ul>
                            <li>{t("Hell")}</li>
                            <li>{t("Dunkel")}</li>
                            <li>{t("Schwarz")}</li>
                            <li>{t("Dunkelblau")}</li>
                        </ul>
                    </Typography>
                </Element>
                <Element icon={FaBolt} title={t("Effizient dank neuester Technologie")}>
                    <Typography variant="body2" color="textSecondary">
                        {t("Wir scheuen uns nicht davor, moderne Technologie zu benutzen um die App zu effizient wie möglich zu machen.")}
                    </Typography>
                </Element>
                <Element icon={FaEyeSlash} title={t("Kein Ausspionieren mehr möglich")}>
                    <Typography variant="body2" color="textSecondary">
                        {t("tabool lädt automatisch deinen Stundenplan mit allen anderen Daten im Hintergrund runter. " +
                            "Somit kann Scooso nicht mehr herausfinden, wann du wirklich den Stundenplan geöffnet hast, welche " +
                            "Stunde du dir angeschaut hast oder was du sonst auf der Website gemacht hast.")}
                    </Typography>
                </Element>
            </List>
            <Box alignItems="center" justifyContent="center" display="flex" mt={4}>
                <PrimaryButton fullWidth size="large" href={buildPath("/auth/registration/")}>
                    {t("Registrieren")}
                </PrimaryButton>
            </Box>
        </FocusedPage>
    );
};

export default LandingPage;
