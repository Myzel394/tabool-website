import React, {memo} from "react";
import {useTranslation} from "react-i18next";
import {FormControl, FormControlLabel, List, ListItem, ListItemText, Paper, Radio, RadioGroup} from "@material-ui/core";
import {useUserPreferences} from "hooks";


const Design = () => {
    const {t} = useTranslation();
    const {
        state,
        update,
    } = useUserPreferences();

    return (
        <Paper>
            <List>
                <ListItem>
                    <FormControl component="fieldset">
                        <ListItemText primary={t("Thema")} />
                        <RadioGroup
                            name="_active_theme"
                            value={state?.global?.theme ?? "light"}
                            onChange={event => update.global.setTheme(event.target.value as "light" | "dark")}
                        >
                            <FormControlLabel value="light" control={<Radio />} label={t("Hell")} />
                            <FormControlLabel value="dark" control={<Radio />} label={t("Dunkel")} />
                        </RadioGroup>
                    </FormControl>
                </ListItem>
            </List>
        </Paper>
    );
};

export default memo(Design);
