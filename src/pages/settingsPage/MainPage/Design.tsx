import React, {memo, useContext} from "react";
import {useTranslation} from "react-i18next";
import {FormControl, FormControlLabel, List, ListItem, ListItemText, Paper, Radio, RadioGroup} from "@material-ui/core";
import {UtilsContext} from "contexts";


const Design = () => {
    const {t} = useTranslation();
    const {
        activeTheme,
        setActiveTheme,
    } = useContext(UtilsContext);

    return (
        <Paper>
            <List>
                <ListItem>
                    <FormControl component="fieldset">
                        <ListItemText primary={t("Thema")} />
                        <RadioGroup
                            name="_active_theme"
                            value={activeTheme}
                            onChange={event => setActiveTheme(event.target.value as "light" | "dark")}
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
