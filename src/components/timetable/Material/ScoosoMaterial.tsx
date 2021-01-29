import React, {useState} from "react";
import {Box, Link, Paper, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";

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
                        <Typography variant="body2" color="textSecondary">
                            {t("Diese Datei könnte schädlich sein, daher wurde sie nicht auf tabool runtergeladen. " +
                                "Du kannst sie aber über Scooso runterladen. Tippe, um sie über Scooso runterzuladen.")}
                        </Typography>
                    </Box>
                </Box>
            </Link>
            <GetDownloadLink
                materialId={id}
                isOpen={downloadFile}
                onClose={() => setDownloadFile(false)}
            />
        </>
    );
};

export default ScoosoMaterial;
