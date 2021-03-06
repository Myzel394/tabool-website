import React, {useContext} from "react";
import {Box, FormControlLabel, InputAdornment, Switch, TextField} from "@material-ui/core";
import {MdSearch} from "react-icons/all";
import {useTranslation} from "react-i18next";

import FileListContext from "./FileListContext";

const Form = () => {
    const {t} = useTranslation();
    const {
        setSubtractDownloaded,
        setSubtractNotAvailable,
        setSearch,
        subtractDownloaded,
        subtractNotAvailable,
        rawSearch,
    } = useContext(FileListContext);

    return (
        <Box my={5}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder={t("Nach Dateien suchen")}
                value={rawSearch}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <MdSearch />
                        </InputAdornment>
                    ),
                }}
                onChange={event => setSearch(event.target.value)}
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={subtractDownloaded}
                        onChange={event => setSubtractDownloaded(event.target.checked)}
                    />
                }
                label={t("Bereits heruntergeladene abziehen")}
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={subtractNotAvailable}
                        onChange={event => setSubtractNotAvailable(event.target.checked)}
                    />
                }
                label={t("Noch nicht verfügbare abziehen")}
            />
        </Box>
    );
};

export default Form;
