import React from "react";
import {FocusedPage, PrimaryButton, SecondaryButton} from "components";
import {useTranslation} from "react-i18next";
import {Box, Grid, Link, Typography} from "@material-ui/core";
import {isAndroid, isIOS} from "react-device-detect";


export interface IIsChrome {
    onClose: () => any;
}

const downloadLink = (() => {
    if (isIOS) {
        return "https://apps.apple.com/us/app/google-chrome/id535886823";
    } else if (isAndroid) {
        return "https://play.google.com/store/apps/details?id=com.android.chrome";
    } else {
        return "https://www.google.com/chrome/";
    }
})();


const IsChrome = ({onClose}: IIsChrome) => {
    const {t} = useTranslation();

    return (
        <FocusedPage title={t("Chrome benötigt")} onBackButtonClick={onClose}>
            <Box mb={2}>
                <Typography variant="body1">
                    {t("Diese App ist speziell für Chrome entwickelt. " +
                        "Sie könnte auf anderen Browserm funktionieren - darauf kannst du dich aber nicht verlassen.")}
                </Typography>
                <Typography variant="body1">
                    {t("Benutze bitte Chrome, damit die App einwandfrei funktioniert und du die neuesten Technologien benutzen kannst.")}
                </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item>
                    <Link
                        component={PrimaryButton}
                        href={downloadLink}
                        rel="noopener noreferrer"
                        underline="none"
                    >
                        {t("Chrome runterladen")}
                    </Link>
                </Grid>
                <Grid item>
                    <SecondaryButton onClick={onClose}>
                        {t("Ignorieren")}
                    </SecondaryButton>
                </Grid>
            </Grid>
        </FocusedPage>
    );
};

export default IsChrome;
