import React, {memo} from "react";
import {useTranslation} from "react-i18next";
import {
    FormControl,
    FormControlLabel,
    List,
    ListItem,
    ListItemText,
    Paper,
    Radio,
    RadioGroup,
} from "@material-ui/core";
import {usePreferences} from "hooks";
import {Information} from "components";
import {FaMoon, FaSun, IoIosWater, WiMoonFull} from "react-icons/all";


const Design = () => {
    const {t} = useTranslation();
    const {
        state,
        update,
    } = usePreferences();

    return (
        <Paper>
            <List>
                <ListItem>
                    <FormControl component="fieldset">
                        <ListItemText primary={t("Thema")} />
                        <RadioGroup
                            name="_active_theme"
                            value={state?.global?.theme ?? "light"}
                            onChange={event => update.global.setTheme(event.target.value as "light" | "dark" | "blue" | "midnight")}
                        >
                            <FormControlLabel
                                value="light"
                                control={<Radio />}
                                label={
                                    <Information
                                        getIcon={props => <FaSun {...props} />}
                                        text={t("Hell")}
                                    />}
                            />
                            <FormControlLabel
                                value="dark"
                                control={<Radio />}
                                label={
                                    <Information
                                        getIcon={props => <FaMoon {...props} />}
                                        text={t("Dunkel")}
                                    />}
                            />
                            <FormControlLabel
                                value="blue"
                                control={<Radio />}
                                label={
                                    <Information
                                        getIcon={props => <IoIosWater {...props} />}
                                        text={t("Dunkelblau")}
                                    />}
                            />
                            <FormControlLabel
                                value="midnight"
                                control={<Radio />}
                                label={
                                    <Information
                                        getIcon={props => <WiMoonFull {...props} />}
                                        text={t("Schwarz")}
                                    />}
                            />
                        </RadioGroup>
                    </FormControl>
                </ListItem>
            </List>
        </Paper>
    );
};

export default memo(Design);
