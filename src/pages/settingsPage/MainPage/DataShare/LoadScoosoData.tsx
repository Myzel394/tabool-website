import React, {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {DialogContentText, ListItem, ListItemSecondaryAction, ListItemText, Switch} from "@material-ui/core";
import {PrimaryButton, SecondaryButton, SimpleDialog} from "components";
import {IUpdateUserData, IUpdateUserDataResponse, useUpdateUserAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {UserContext} from "contexts";
import {useInheritedState} from "hooks";


const LoadScoosoData = () => {
    const {t} = useTranslation();
    const {dispatch, state: user} = useContext(UserContext);
    const updateUser = useUpdateUserAPI();

    const [allow, setAllow] = useInheritedState<boolean>(user.data?.loadScoosoData ?? true);
    const [confirm, setConfirm] = useState<boolean>(false);

    const {
        mutate,
    } = useMutation<IUpdateUserDataResponse, AxiosError, IUpdateUserData>(
        updateUser,
        {
            onSuccess: result => dispatch({
                type: "change_load_scooso_data",
                payload: {
                    loadScoosoData: result.loadScoosoData,
                },
            }),
        },
    );

    const updateLoadScoosoData = (loadScoosoData: boolean) => {
        setAllow(loadScoosoData);
        mutate({
            loadScoosoData,
        });
    };

    if (!user.data) {
        return null;
    }

    return (
        <>
            <ListItem>
                <ListItemText primary={t("Scooso-Daten laden")} />
                <ListItemSecondaryAction>
                    <Switch
                        checked={allow}
                        onChange={event => {
                            if (event.target.checked) {
                                updateLoadScoosoData(true);
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
                            updateLoadScoosoData(false);
                        }}
                    >
                        {t("Deaktivieren")}
                    </SecondaryButton>
                )}
                title={t("Keine Scooso-Daten laden?")}
                onClose={() => setConfirm(false)}
            >
                <DialogContentText>
                    {t("Deine Scooso-Daten werden vom Server automatisch im Hintergrund geladen. Sofern du diesem " +
                        "widersprichst, werden deine Daten nicht mehr geladen und du kannst auf keine Daten von Scooso über tabool zugreifen. " +
                        "Die App wird also für dich sogut wie unbrauchbar.")}
                </DialogContentText>
                <DialogContentText>
                    {t("Sofern du diesem jedoch nicht widersprichst, " +
                        "übernimmst du die Haftung für das automatische Laden der Daten im Hintergrund.")}
                </DialogContentText>
            </SimpleDialog>
        </>
    );
};

export default LoadScoosoData;
