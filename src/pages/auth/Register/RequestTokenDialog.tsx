import React, {useState} from "react";
import {SecondaryButton, SimpleDialog} from "components";
import {Trans, useTranslation} from "react-i18next";
import {APP_NAME, CONTACT_EMAIL, CONTACT_NUMBER} from "react_constants";
import {
    DialogContentText,
    List,
    ListItem,
    ListItemIcon,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
} from "@material-ui/core";
import {FaSmile, FaWhatsapp, MdEmail} from "react-icons/all";


const RequestTokenDialog = () => {
    const {t} = useTranslation();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <SecondaryButton onClick={() => setIsOpen(true)}>
                {t("Zugangscode beantragen")}
            </SecondaryButton>
            <SimpleDialog
                isOpen={isOpen}
                primaryButton={null}
                title={t("Zugangscode beantragen")}
                onClose={() => setIsOpen(false)}
            >
                <DialogContentText>
                    <Trans>
                        {{APP_NAME}} ist für uns Schüler entwickelt.
                    Lehrer, Eltern, Schulleiter und andere Menschen außerhalb der Schule bekommen <strong>keinen Zugang</strong>.
                    Damit wir wissen, dass du ein Schüler bist, musst du einen <strong>Token</strong> angeben.
                    </Trans>
                </DialogContentText>
                <DialogContentText>
                    {t("Die Registrierung sieht wie folgt aus:")}
                </DialogContentText>
                <Stepper orientation="vertical" activeStep={0}>
                    <Step completed={false}>
                        <StepLabel>{t("Zugangscode holen")}</StepLabel>
                        <StepContent>
                            <Typography color="textSecondary">
                                {t("Hole dir einen Token über einen Admin. Admins können über folgende Medien erreicht werden:")}
                            </Typography>
                            <List>
                                <ListItem
                                    button
                                    onClick={() => window.open(`https://wa.me/${CONTACT_NUMBER}`, "_blank")}
                                >
                                    <ListItemIcon>
                                        <FaWhatsapp color="#25D366" />
                                    </ListItemIcon>
                                    <Typography color="textPrimary">
                                    Whatsapp
                                    </Typography>
                                </ListItem>
                                <ListItem
                                    button
                                    onClick={() => window.open(`mailto:${CONTACT_EMAIL}`, "_blank")}
                                >
                                    <ListItemIcon>
                                        <MdEmail color="#888" />
                                    </ListItemIcon>
                                    <Typography color="textPrimary">
                                    E-Mail
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <FaSmile color="#ffbf00" />
                                    </ListItemIcon>
                                    <Typography color="textPrimary">
                                    Realität
                                    </Typography>
                                </ListItem>
                            </List>
                        </StepContent>
                    </Step>
                    <Step completed={false}>
                        <StepLabel>{t("Registrieren")}</StepLabel>
                    </Step>
                </Stepper>
            </SimpleDialog>
        </>

    );
};

export default RequestTokenDialog;
