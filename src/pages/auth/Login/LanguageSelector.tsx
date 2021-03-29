import {AVAILABLE_LANGUAGES} from "constants/language";

import {Box, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import React from "react";
import {AvailableLanguages} from "types";
import {getLanguageFromI18Next} from "utils";
import ReactCountryFlag from "react-country-flag";
import i18next from "i18next";
import {useTranslation} from "react-i18next";

const centerStyle = {
    marginTop: "auto",
};

const LanguageSelector = () => {
    const {t} = useTranslation();
    const language = getLanguageFromI18Next();
    const selectedLanguage = AVAILABLE_LANGUAGES.find(({code}) => code === language);
    const updateLanguage = i18next.changeLanguage;

    return (
        <Box style={centerStyle} mb={2}>
            <FormControl variant="outlined">
                <InputLabel>
                    {t("Sprache")}
                </InputLabel>
                <Select
                    label={t("Sprache")}
                    value={language}
                    renderValue={() => selectedLanguage && (
                        <Box display="flex" alignItems="center">
                            <ReactCountryFlag
                                countryCode={selectedLanguage.countryCode}
                            />
                            <Box ml={1} component="span">
                                {selectedLanguage.label}
                            </Box>
                        </Box>
                    )}
                    variant="outlined"
                    onChange={event => {
                        if (event.target.value) {
                            updateLanguage(event.target.value as AvailableLanguages);
                        }
                    }}
                >
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
                </Select>
            </FormControl>
        </Box>
    );
};

export default LanguageSelector;
