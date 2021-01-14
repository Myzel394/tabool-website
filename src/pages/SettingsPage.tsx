import React from "react";
import {useTranslation} from "react-i18next";
import {
    Grid,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Switch,
    Typography,
} from "@material-ui/core";
import {DefaultPage} from "components";


const SettingsPage = () => {
    const {t} = useTranslation();

    return (
        <DefaultPage>
            <Grid container spacing={1}>
                <Grid item>
                    <Typography variant="h5" component="h1" color="textSecondary">
                        {t("Berechtigungen")}
                    </Typography>
                </Grid>
                <Grid
                    item
                    style={{
                        width: "100%",
                    }}
                >
                    <Paper>
                        <List>
                            <ListItem>
                                <ListItemText primary={t("Benachrichtigungen")} />
                            </ListItem>
                            <ListItemSecondaryAction>
                                <Switch />
                            </ListItemSecondaryAction>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </DefaultPage>
    );
};

export default SettingsPage;
