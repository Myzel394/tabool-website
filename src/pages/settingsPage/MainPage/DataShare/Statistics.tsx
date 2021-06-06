import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {DialogContentText, ListItem, ListItemSecondaryAction, ListItemText, Switch} from "@material-ui/core";
import {PrimaryButton, SecondaryButton, SimpleDialog} from "components";
import {useDispatch, useSelector} from "react-redux";
import {RootState, setAllowStatistics} from "states";


const Statistics = () => {
    const {t} = useTranslation();
    const allowStatistics = useSelector<RootState>(
        state => state.preferences?.global?.allowStatistics ?? true,
    ) as boolean;
    const dispatch = useDispatch();

    const [confirm, setConfirm] = useState<boolean>(false);

    const setAllow = value => dispatch(setAllowStatistics(value));

    return (
        <>
            <ListItem>
                <ListItemText primary={t("Anonyme Statistiken senden")} />
                <ListItemSecondaryAction>
                    <Switch
                        checked={allowStatistics}
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

export default Statistics;
