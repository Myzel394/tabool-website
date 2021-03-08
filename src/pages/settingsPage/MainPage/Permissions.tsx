import React, {memo} from "react";
import {
    AccordionDetails,
    Collapse,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Switch,
} from "@material-ui/core";
import {usePermissions} from "hooks";
import {useTranslation} from "react-i18next";
import {PermissionType} from "hooks/usePermissions";
import {MdLocationOff, MdLocationOn, MdNotifications, MdNotificationsOff} from "react-icons/all";
import {Alert} from "@material-ui/lab";
import {LoadingOverlay, SecondaryButton} from "components";

interface Permissions {
    notification: PermissionType;
    location: PermissionType;
}

const PERMISSION_UNAVAILABLE = [
    PermissionType.Blocked, PermissionType.NotAvailable,
];

const Permissions = () => {
    const {t} = useTranslation();
    const {
        ask,
        setState,
        state,
        isLoading,
    } = usePermissions();

    const updatePerms = async (name: keyof Permissions, value: boolean) => {
        let state;

        if (value) {
            state = await ask[name]();
        } else {
            state = PermissionType.NotGranted;
        }

        setState(prevState => ({
            ...prevState,
            [name]: state,
        }));
    };
    const isNotificationDisabled = PERMISSION_UNAVAILABLE.includes(state.notification);
    const isLocationDisabled = PERMISSION_UNAVAILABLE.includes(state.location);

    return (
        <Paper>
            <LoadingOverlay isLoading={isLoading}>
                <List>
                    {/* Notification */}
                    <ListItem disabled={isNotificationDisabled}>
                        <ListItemIcon>
                            {state.notification === PermissionType.Granted
                                ? <MdNotifications />
                                : <MdNotificationsOff />
                            }
                        </ListItemIcon>
                        <ListItemText primary={t("Benachrichtigungen")} />
                        <ListItemSecondaryAction>
                            <Switch
                                checked={state.notification === PermissionType.Granted}
                                disabled={isNotificationDisabled}
                                onChange={event => updatePerms("notification", event.target.checked)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Collapse in={state.notification === PermissionType.Granted}>
                        <AccordionDetails>
                            <SecondaryButton
                                startIcon={<MdNotifications />}
                                onClick={() => new Notification(t("So wirst du benachrichtigt"))}
                            >
                                {t("Test senden")}
                            </SecondaryButton>
                        </AccordionDetails>
                    </Collapse>
                    {/* Location */}
                    <ListItem disabled={isLocationDisabled}>
                        <ListItemIcon>
                            {state.location === PermissionType.Granted
                                ? <MdLocationOn />
                                : <MdLocationOff />
                            }
                        </ListItemIcon>
                        <ListItemText primary={t("Standort")} />
                        <ListItemSecondaryAction>
                            <Switch
                                checked={state.location === PermissionType.Granted}
                                disabled={isLocationDisabled}
                                onChange={event => updatePerms("location", event.target.checked)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
                {((state.notification === PermissionType.Blocked) || (state.location === PermissionType.Blocked)) &&
                <Alert severity="warning">
                    {t("Du hast Berechtigungen verboten, diese können daher nicht mehr angefragt werden. " +
                        "Wenn du sie dennoch wieder erlauben möchtest, musst du sie in den Einstellungen ändern.")}
                    <br />
                    <Link
                        href="https://support.google.com/chromebook/answer/114662?hl=de" rel="noopener noreferrer"
                        component="a"
                    >
                        {t("Wie ändere ich Website-Berechtigungen?")}
                    </Link>
                </Alert>}
            </LoadingOverlay>
        </Paper>
    );
};

export default memo(Permissions);
