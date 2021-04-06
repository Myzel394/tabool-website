import {AVAILABLE_LANGUAGES} from "constants/language";

import React, {useState} from "react";
import {Box, FormControl, InputLabel, List, ListItem, MenuItem, Paper, Select} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getLanguage, RootState, setLanguage} from "state";
import {AvailableLanguages} from "types";
import ReactCountryFlag from "react-country-flag";
import {useTranslation} from "react-i18next";
import {MdAdd} from "react-icons/all";
import {CurrentDeviceOSIcon} from "components";
import {getLanguageFromI18Next} from "utils";

import HelpNeeded from "./HelpNeeded";

const Language = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const [isHelpDialogOpen, setIsHelpDialogOpen] = useState<boolean>(false);

    const selectedLanguageOption = useSelector<RootState>(getLanguage) as AvailableLanguages;
    const isAutomatic = selectedLanguageOption === "_automatic";
    const language = isAutomatic ? getLanguageFromI18Next() : selectedLanguageOption;

    const updateLanguage = (value: AvailableLanguages) => dispatch(setLanguage(value));
    const selectedLanguage = AVAILABLE_LANGUAGES.find(({code}) => code === language);

    return (
        <>
            <Paper>
                <List>
                    <ListItem>
                        <FormControl variant="outlined">
                            <InputLabel>
                                {t("Sprache")}
                            </InputLabel>
                            <Select
                                label={t("Sprache")}
                                value={selectedLanguageOption}
                                renderValue={() => selectedLanguage && (
                                    <Box display="flex" alignItems="center">
                                        <ReactCountryFlag
                                            countryCode={selectedLanguage.countryCode}
                                        />
                                        <Box ml={1} component="span">
                                            {selectedLanguage.label}
                                        </Box>
                                        {isAutomatic && (
                                            <Box ml={1} component="i">
                                                {t("(Automatisch)")}
                                            </Box>
                                        )}
                                    </Box>
                                )}
                                variant="outlined"
                                onChange={event => {
                                    if (event.target.value) {
                                        updateLanguage(event.target.value as AvailableLanguages);
                                    }
                                }}
                            >
                                <MenuItem value="_automatic">
                                    <Box display="flex" alignItems="center">
                                        <CurrentDeviceOSIcon />
                                        <Box ml={1} component="span">
                                            {t("Automatisch")}
                                        </Box>
                                    </Box>
                                </MenuItem>
                                {AVAILABLE_LANGUAGES.map(({label, code, countryCode}) =>
                                    <MenuItem key={code} value={code}>
                                        <Box display="flex" alignItems="center">
                                            <ReactCountryFlag
                                                countryCode={countryCode}
                                            />
                                            <Box ml={1} component="span">
                                                {label}
                                            </Box>
                                        </Box>
                                    </MenuItem>)}
                                <MenuItem
                                    onClick={() => setIsHelpDialogOpen(true)}
                                >
                                    <Box display="flex" alignItems="center">
                                        <MdAdd />
                                        <Box ml={1} component="span">
                                            {t("Sprache hinzufügen")}
                                        </Box>
                                    </Box>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                </List>
            </Paper>
            <HelpNeeded
                isOpen={isHelpDialogOpen}
                onClose={() => setIsHelpDialogOpen(false)}
            />
        </>
    );
};

export default Language;
