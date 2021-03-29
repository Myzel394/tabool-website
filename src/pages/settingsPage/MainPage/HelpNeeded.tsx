import React from "react";
import {SecondaryButton, SimpleDialog} from "components";
import {DialogContentText, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {MdEmail} from "react-icons/all";
import createMailToLink from "mailto-link";

import {EMAIL} from "../../../constants/contact";

export interface IHelpNeeded {
    isOpen: boolean;
    onClose: () => any;
}

const HelpNeeded = ({
    isOpen,
    onClose,
}: IHelpNeeded) => {
    const {t} = useTranslation();

    return (
        <SimpleDialog
            isOpen={isOpen}
            primaryButton={null}
            secondaryButton={
                <SecondaryButton onClick={onClose}>
                    {t("Schließen")}
                </SecondaryButton>
            }
            title={t("Sprache hinzufügen")}
            onClose={onClose}
        >
            <DialogContentText>
                {t("Wir freuen uns über jede Unterstützung, um tabool für jeden zugänglich zu machen!")}
            </DialogContentText>
            <DialogContentText>
                {t("Kontaktiere uns bitte und gib an, an welcher Sprache du mitwirken möchtest.")}
            </DialogContentText>
            <DialogContentText>
                {t("Wenn du möchtest, kannst du in der Mitgliederliste verewigt werden als ein Dankeschön für deine Hilfe!")}
            </DialogContentText>
            <List>
                <ListItem
                    button
                    component="a"
                    href={createMailToLink({
                        to: EMAIL,
                    })}
                >
                    <ListItemIcon>
                        <MdEmail />
                    </ListItemIcon>
                    <ListItemText
                        primary={t("E-Mail")}
                        secondary={EMAIL}
                    />
                </ListItem>
            </List>
        </SimpleDialog>
    );
};

export default HelpNeeded;
