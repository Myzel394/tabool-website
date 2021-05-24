import React, {useEffect} from "react";
import {Box, Typography} from "@material-ui/core";
import {AiOutlineStop, FaDizzy, FaExclamationTriangle, FaQuestionCircle, FaRunning, GiStack} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {IconType} from "react-icons";

export interface LoadingPageProps {
    status?: number;
    notFound?: string;
    accessDenied?: string;
    tooFast?: string;
    setDocumentTitle?: boolean;
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
        <Box pt={2} maxWidth={300}>
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
    setDocumentTitle,
}: LoadingPageProps) => {
    const {t} = useTranslation();

    let text: string;
    let icon: IconType;

    switch (status) {
        case 404:
            text = notFound ?? t("Nicht gefunden.");
            icon = FaQuestionCircle;
            break;
        case 403:
            text = accessDenied ?? t("Du hast auf diesen Bereich keinen Zugriff.");
            icon = AiOutlineStop;
            break;
        case 429:
            text = tooFast ?? t("Du stellst zu viele Anfragen. Warte etwas.");
            icon = FaRunning;
            break;
        case 500:
            text = t("Es gab einen Fehler beim Server. Du kannst dagegen leider nichts machen. Tut uns Leid.");
            icon = FaDizzy;
            break;
        case 503:
            text = t("Das scheint dem Server zuviel auf einmal zu sein. Du solltest gleich wieder zugreifen können. Warte jedoch etwas.");
            icon = GiStack;
            break;
        default:
            text = t("Es gab einen Fehler.");
            icon = FaExclamationTriangle;
            break;
    }

    useEffect(() => {
        if (setDocumentTitle) {
            if (status) {
                document.title = t("Fehler ({{status}})", {
                    status,
                });
            } else {
                document.title = t("Fehler");
            }
        }
    }, [setDocumentTitle, status, t]);

    return (
        <SimpleText
            text={text}
            icon={icon}
        />
    );
};

ErrorPage.defaultProps = {
    setDocumentTitle: true,
};

export default ErrorPage;
