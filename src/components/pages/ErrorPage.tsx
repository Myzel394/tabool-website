import React from "react";
import {Box, Typography} from "@material-ui/core";
import {AiOutlineStop, FaDizzy, FaExclamationTriangle, FaQuestionCircle, FaRunning, GiStack} from "react-icons/all";
import {useTranslation} from "react-i18next";

export interface ILoadingPage {
    status?: number;
    notFound?: string;
    accessDenied?: string;
    tooFast?: string;
}

const SimpleText = ({text, icon: Icon}) => (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{height: "100vh"}}
    >
        <Icon size="3rem" />
        <Box pt={2} maxWidth={200}>
            <Typography variant="h5" align="center">
                {text}
            </Typography>
        </Box>
    </Box>
);

const ErrorPage = ({
    status,
    notFound,
    accessDenied,
    tooFast,
}: ILoadingPage) => {
    const {t} = useTranslation();

    switch (status) {
        case 404:
            return (
                <SimpleText text={notFound ?? t("Nicht gefunden.")} icon={FaQuestionCircle} />
            );
        case 403:
            return (
                <SimpleText
                    text={accessDenied ?? t("Du hast auf diesen Bereich keinen Zugriff.")}
                    icon={AiOutlineStop}
                />
            );
        case 429:
            return (
                <SimpleText
                    text={tooFast ?? t("Du stellst zu viele Anfragen. Warte etwas.")}
                    icon={FaRunning}
                />
            );
        case 500:
            return (
                <SimpleText
                    text={t("Es gab einen Fehler beim Server. Du kannst dagegen leider nichts machen. Tut uns Leid.")}
                    icon={FaDizzy}
                />
            );
        case 503:
            return (
                <SimpleText
                    text={t("Das scheint dem Server zuviel auf einmal zu sein. Du solltest gleich wieder zugreifen können. Warte jedoch etwas.")}
                    icon={GiStack}
                />
            );
        default:
            return (
                <SimpleText
                    text={t("Es gab einen Fehler.")}
                    icon={FaExclamationTriangle}
                />
            );
    }
};

export default ErrorPage;
