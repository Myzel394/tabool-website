import React, {memo, useState} from "react";
import {Box, Dialog, DialogContent, DialogTitle, Grid, Link, Paper, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {MdWarning} from "react-icons/all";

import GetDownloadLink from "./GetDownloadLink";


export interface IScoosoMaterial {
    name: string;
    id: string;
}

const style = {
    wordBreak: "break-all" as "break-all",
};

const ScoosoMaterial = ({
    name,
    id,
}: IScoosoMaterial) => {
    const {t} = useTranslation();

    const [downloadFile, setDownloadFile] = useState<boolean>(false);

    return (
        <>
            <Link
                component={Paper}
                underline="none"
                rel="noopener noreferrer"
                onClick={() => setDownloadFile(true)}
            >
                <Box p={2}>
                    <Typography variant="body1" color="textPrimary" style={style}>
                        {name}
                    </Typography>
                    <Box py={2}>
                        <Grid container direction="row" alignItems="center" spacing={1}>
                            <Grid item xs={2}>
                                <Box p={1}>
                                    <Typography variant="body2" color="textSecondary">
                                        <MdWarning size="100%" />
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="body2" color="textSecondary">
                                    {t("Diese Datei könnte schädlich sein, daher wurde sie nicht auf tabool runtergeladen. " +
                                        "Du kannst sie aber über Scooso runterladen. " +
                                    "Klicke, um sie über Scooso runterzuladen.")}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Link>
            <Dialog open={downloadFile} onBackdropClick={() => setDownloadFile(false)}>
                <DialogTitle>
                    {t("Datei downloaden")}
                </DialogTitle>
                <DialogContent>
                    <GetDownloadLink
                        materialId={id}
                        onClose={() => setDownloadFile(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default memo(ScoosoMaterial);
