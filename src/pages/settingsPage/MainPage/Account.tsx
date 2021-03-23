import React, {memo} from "react";
import {
    Avatar,
    Chip,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Paper,
} from "@material-ui/core";
import {useUser} from "hooks";
import {FiLogOut, MdAccountCircle, MdDevices, MdLock, MdVpnKey} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {UserType} from "api";
import {TeacherIcon} from "components";
import {buildPath} from "utils";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        marginTop: theme.spacing(1),
        margin: 0,
        padding: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const Account = () => {
    const {t} = useTranslation();
    const user = useUser();
    const classes = useStyles();

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
                            {{
                                [UserType.Student]: <MdAccountCircle />,
                                [UserType.Teacher]: <TeacherIcon />,
                            }[user.data.userType]}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${user.data.firstName} ${user.data.lastName}`}
                        secondary={
                            <>
                                <span>{user.data.email}</span>
                                <ul className={classes.root}>
                                    <li>
                                        <Chip
                                            className={classes.chip}
                                            variant="outlined"
                                            size="small"
                                            color="primary"
                                            label={{
                                                [UserType.Student]: t("Schüler"),
                                                [UserType.Teacher]: t("Lehrer"),
                                            }[user.data.userType]}
                                        />
                                    </li>
                                    {user.isAdmin && (
                                        <li>
                                            <Chip
                                                className={classes.chip}
                                                variant="outlined"
                                                size="small"
                                                color="primary"
                                                icon={<MdVpnKey size="19px" />}
                                                label={t(" Admin")}
                                            />
                                        </li>
                                    )}
                                </ul>
                            </>
                        }
                    />
                </ListItem>
                <ListItem
                    button
                    color="textPrimary"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
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
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
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
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
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
