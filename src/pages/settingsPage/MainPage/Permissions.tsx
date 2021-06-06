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
import {RootState, setLocation, setNotification} from "state";
import {PermissionType} from "App/RequiredPermissions/permissions/types";

const PERMISSION_UNAVAILABLE = [
    PermissionType.Blocked, PermissionType.NotAvailable,
];

const PERMISSION_BOOL_MAP = {
    true: PermissionType.Granted,
    false: PermissionType.Denied,
};

const Permissions = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const notificationPerm = useSelector<RootState>(state => state.permissions.notification) as PermissionType;
    const locationPerm = useSelector<RootState>(state => state.permissions.location) as PermissionType;

    const isNotificationDisabled = PERMISSION_UNAVAILABLE.includes(notificationPerm);
    const isLocationDisabled = PERMISSION_UNAVAILABLE.includes(locationPerm);

    return (
        <Paper>
            <List>
                {/* Notification */}
                <ListItem disabled={isNotificationDisabled}>
                    <ListItemIcon>
                        {notificationPerm === PermissionType.Granted
                            ? <MdNotifications />
                            : <MdNotificationsOff />
                        }
                    </ListItemIcon>
                    <ListItemText primary={t("Benachrichtigungen")} />
                    <ListItemSecondaryAction>
                        <Switch
                            checked={notificationPerm === PermissionType.Granted}
                            disabled={isNotificationDisabled}
                            onChange={event => dispatch(setNotification(PERMISSION_BOOL_MAP[event.target.checked.toString()]))}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={notificationPerm === PermissionType.Granted}>
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
                        {locationPerm === PermissionType.Granted
                            ? <MdLocationOn />
                            : <MdLocationOff />
                        }
                    </ListItemIcon>
                    <ListItemText primary={t("Standort")} />
                    <ListItemSecondaryAction>
                        <Switch
                            checked={locationPerm === PermissionType.Granted}
                            disabled={isLocationDisabled}
                            onChange={event => dispatch(setLocation(PERMISSION_BOOL_MAP[event.target.checked.toString()]))}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            {((notificationPerm === PermissionType.Blocked) || (locationPerm === PermissionType.Blocked)) && (
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
