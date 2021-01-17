import React, {memo} from "react";
import {Avatar, Link, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Paper} from "@material-ui/core";
import {useUser} from "hooks";
import {FiLogOut, MdAccountCircle, MdDevices, MdEnhancedEncryption, MdLock} from "react-icons/all";
import {useTranslation} from "react-i18next";

import {buildPath} from "../../../utils";


const Account = () => {
    const {t} = useTranslation();
    const user = useUser();

    // User is authenticated, just for typescript
    if (!user.data) {
        return null;
    }

    return (
        <Paper>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <MdAccountCircle />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${user.data.firstName} ${user.data.lastName}`}
                        secondary={user.data.email}
                    />
                </ListItem>
                <ListItem
                    button
                    color="textPrimary"
                    href={buildPath("/settings/change-password/")}
                    component={Link}
                >
                    <ListItemIcon>
                        <MdLock />
                    </ListItemIcon>
                    <ListItemText primary={t("Passwort ändern")} />
                </ListItem>
                <ListItem
                    button
                    color="textPrimary"
                    href={buildPath("/settings/change-scooso-credentials/")}
                    component={Link}
                >
                    <ListItemIcon>
                        <MdEnhancedEncryption />
                    </ListItemIcon>
                    <ListItemText primary={t("Scooso-Daten ändern")} />
                </ListItem>
                <ListItem
                    button
                    color="textPrimary"
                    href={buildPath("/settings/logged-in-devices/")}
                    component={Link}
                >
                    <ListItemIcon>
                        <MdDevices />
                    </ListItemIcon>
                    <ListItemText primary={t("Angemeldete Geräte")} />
                </ListItem>
                <ListItem
                    button
                    color="textPrimary"
                    href={buildPath("/auth/logout/")}
                    component={Link}
                >
                    <ListItemIcon>
                        <FiLogOut />
                    </ListItemIcon>
                    <ListItemText primary={t("Abmelden")} />
                </ListItem>
            </List>
        </Paper>
    );
};

export default memo(Account);
