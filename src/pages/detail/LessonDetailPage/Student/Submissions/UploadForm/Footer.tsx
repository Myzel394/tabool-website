import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, Checkbox, FormControlLabel, Grid, IconButton, Typography} from "@material-ui/core";
import {PrimaryButton} from "components";
import {MdFileUpload, MdInfoOutline} from "react-icons/all";
import {supportsWASM} from "supports";

import ExplainDialog from "./ExplainDialog";


export interface IFooter {
    compressImages: boolean;
    onCompressImagesChange: (compressImages: boolean) => void;

    onUpload: () => any;

    containsImages: boolean;
    disabled: boolean;
}

const FULL_WIDTH = {
    width: "100%",
};

const Footer = ({
    compressImages,
    onUpload,
    onCompressImagesChange,
    containsImages,
    disabled,
}: IFooter) => {
    const {t} = useTranslation();

    const [showExplanation, setShowExplanation] = useState<boolean>(false);

    return (
        <>
            <Box m={2} component="aside">
                <Grid container spacing={1} direction="row">
                    <Grid item style={FULL_WIDTH}>
                        <PrimaryButton
                            fullWidth
                            disabled={disabled}
                            startIcon={<MdFileUpload />}
                            onClick={onUpload}
                        >
                            {t("Hochladen")}
                        </PrimaryButton>
                    </Grid>
                    {containsImages && (
                        <Grid item>
                            <FormControlLabel
                                label={
                                    <Box display="flex" alignItems="center">
                                        {t("Bilder komprimieren")}
                                        <IconButton
                                            size="small"
                                            onClick={() => setShowExplanation(true)}
                                        >
                                            <MdInfoOutline />
                                        </IconButton>
                                    </Box>
                                }
                                control={
                                    <Checkbox
                                        color="primary"
                                        disabled={disabled || !supportsWASM}
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
export default Footer;

