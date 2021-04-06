import React, {memo, useState} from "react";
import {Box, Checkbox, FormControlLabel, Grid, IconButton, Typography} from "@material-ui/core";
import {PrimaryButton} from "components";
import {MdFileUpload, MdInfoOutline} from "react-icons/all";
import {supportsWASM} from "supports";
import {useTranslation} from "react-i18next";

import ExplainDialog from "./ExplainDialog";

export interface IFooter {
    onUpload: () => any;
    containsImages: boolean;
    compressImages: boolean;
    onCompressImagesChange: (newValue: boolean) => any;
}

const fullWidth = {
    width: "100%",
};

const Footer = ({
    compressImages,
    containsImages,
    onCompressImagesChange,
    onUpload,
}: IFooter) => {
    const {t} = useTranslation();

    const [showExplanation, setShowExplanation] = useState<boolean>(false);

    return (
        <>
            <Box m={2} component="aside">
                <Grid container spacing={1} direction="row">
                    <Grid item style={fullWidth}>
                        <PrimaryButton fullWidth startIcon={<MdFileUpload />} onClick={onUpload}>
                            {t("Hochladen")}
                        </PrimaryButton>
                    </Grid>
                    {containsImages && (
                        <Grid item>
                            <FormControlLabel
                                label={
                                    <Box component="span" display="flex" alignItems="center">
                                        {t("Bilder komprimieren")}
                                        <IconButton size="small" onClick={() => setShowExplanation(true)}>
                                            <MdInfoOutline />
                                        </IconButton>
                                    </Box>
                                }
                                control={
                                    <Checkbox
                                        color="primary"
                                        disabled={!supportsWASM}
                                        checked={compressImages}
                                        onChange={event => onCompressImagesChange(event.target.checked)}
                                    />
                                }
                            />
                        </Grid>
                    )}
                </Grid>
                <Box py={2}>
                    <Typography variant="body2" color="textSecondary">
                        {t("Tippe auf das Avatar einer Datei (Bild links am Rand), um es zu entfernen.")}
                    </Typography>
                </Box>
            </Box>
            <ExplainDialog
                isOpen={showExplanation}
                onClose={() => setShowExplanation(false)}
                onActivateCompression={() => {
                    onCompressImagesChange(true);
                    setShowExplanation(false);
                }}
            />
        </>
    );
};

export default memo(Footer);
