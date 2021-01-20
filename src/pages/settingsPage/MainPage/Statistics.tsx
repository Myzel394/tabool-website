import React, {memo, useState} from "react";
import {useTranslation} from "react-i18next";
import {
    DialogContentText,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Switch,
} from "@material-ui/core";
import {useUserPreferences} from "hooks";
import {PrimaryButton, SecondaryButton, SimpleDialog} from "components";


const Statistics = () => {
    const {t} = useTranslation();
    const {
        state,
        update,
    } = useUserPreferences();

    const [confirm, setConfirm] = useState<boolean>(false);

    const allow = state?.global?.allowStatistics ?? true;
    const setAllow = update.global.setAllowStatistics;

    return (
        <>
            <Paper>
                <List>
                    <ListItem>
                        <ListItemText primary={t("Anonyme Statistiken senden")} />
                        <ListItemSecondaryAction>
                            <Switch
                                checked={allow}
                                onChange={event => {
                                    if (event.target.checked) {
                                        setAllow(true);
                                    } else {
                                        setConfirm(true);
                                    }
                                }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Paper>
            <SimpleDialog
                isOpen={confirm}
                primaryButton={(
                    <PrimaryButton onClick={() => setConfirm(false)}>
                        {t("Erlauben")}
                    </PrimaryButton>
                )}
                secondaryButton={(
                    <SecondaryButton
                        onClick={() => {
                            setConfirm(false);
                            setAllow(false);
                        }}
                    >
                        {t("Deaktivieren")}
                    </SecondaryButton>
                )}
                title={t("Keine anonymen Statistiken senden?")}
                onClose={() => setConfirm(false)}
            >
                <DialogContentText>
                    {t("Wir sind nur eine kleine Menge Schüler - darum zählt jeder einzelne. " +
                        "Deine anonymen Daten können nicht auf dich zurückverfolgt werden und werden auch nicht mit der Schule geteilt. " +
                        "Bitte unterstütze die App indem du deine Daten zur Verbesserung der Sicherheit, " +
                        "Funktionalität und zur Erhöhung der Benutzer-Erlebnisse bereitstellst.")}
                </DialogContentText>
            </SimpleDialog>
        </>
    );
};

export default memo(Statistics);
