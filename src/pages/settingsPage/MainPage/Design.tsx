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
import {Information} from "components";
import {FaMoon, FaSun, IoIosWater, WiMoonFull} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";
import {AvailableThemes, getTheme, RootState, setTheme} from "state";


const Design = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const theme = useSelector<RootState>(getTheme);
    const updateTheme = (value: AvailableThemes) => dispatch(setTheme(value));

    return (
        <Paper>
            <List>
                <ListItem>
                    <FormControl component="fieldset">
                        <ListItemText primary={t("Thema")} />
                        <RadioGroup
                            name="_active_theme"
                            value={theme}
                            onChange={event => updateTheme(event.target.value as AvailableThemes)}
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
