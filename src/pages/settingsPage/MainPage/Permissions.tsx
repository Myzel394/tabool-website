import React from "react";
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
import {useTranslation} from "react-i18next";
import {MdLocationOff, MdLocationOn, MdNotifications, MdNotificationsOff} from "react-icons/all";
import {Alert} from "@material-ui/lab";
import {SecondaryButton} from "components";
import {useDispatch, useSelector} from "react-redux";
import {RootState, setLocation, setNotification} from "states";
import {useLocationPrompt, useNotificationPrompt} from "hooks";
import {PermissionType} from "utils";

const PERMISSION_UNAVAILABLE = [
    PermissionType.Blocked, PermissionType.NotAvailable,
];

const Permissions = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const promptLocation = useLocationPrompt();
    const promptNotification = useNotificationPrompt();
    const notification = useSelector<RootState>(state => state.permissions.notification) as PermissionType;
    const location = useSelector<RootState>(state => state.permissions.location) as PermissionType;

    const isNotificationDisabled = PERMISSION_UNAVAILABLE.includes(notification);
    const isLocationDisabled = PERMISSION_UNAVAILABLE.includes(location);

    return (
        <Paper>
            <List>
                {/* Notification */}
                <ListItem disabled={isNotificationDisabled}>
                    <ListItemIcon>
                        {notification === PermissionType.Granted
                            ? <MdNotifications />
                            : <MdNotificationsOff />
                        }
                    </ListItemIcon>
                    <ListItemText primary={t("Benachrichtigungen")} />
                    <ListItemSecondaryAction>
                        <Switch
                            checked={notification === PermissionType.Granted}
                            disabled={isNotificationDisabled}
                            onChange={() => {
                                if (notification === PermissionType.Granted) {
                                    dispatch(setNotification(PermissionType.Denied));
                                } else {
                                    promptNotification();
                                }
                            }}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={notification === PermissionType.Granted}>
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
                        {location === PermissionType.Granted
                            ? <MdLocationOn />
                            : <MdLocationOff />
                        }
                    </ListItemIcon>
                    <ListItemText primary={t("Standort")} />
                    <ListItemSecondaryAction>
                        <Switch
                            checked={location === PermissionType.Granted}
                            disabled={isLocationDisabled}
                            onChange={() => {
                                if (location === PermissionType.Granted) {
                                    dispatch(setLocation(PermissionType.Denied));
                                } else {
                                    promptLocation();
                                }
                            }}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            {((notification === PermissionType.Blocked) || (location === PermissionType.Blocked)) && (
                <Alert severity="warning">
                    {t("Du hast Berechtigungen verboten, diese können daher nicht mehr angefragt werden. " +
                        "Wenn du sie dennoch wieder erlauben möchtest, musst du sie in den Einstellungen ändern.")}
                    <br />
                    <Link
                        href="https://support.google.com/chromebook/answer/114662?hl=de"
                        rel="noopener noreferrer"
                        component="a"
                    >
                        {t("Wie ändere ich Website-Berechtigungen?")}
                    </Link>
                </Alert>
            )}
        </Paper>
    );
};

export default Permissions;
