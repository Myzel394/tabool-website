import React, {useContext, useState} from "react";
import {Box, Button, Paper} from "@material-ui/core";
import {AiFillFileZip} from "react-icons/all";
import {useTranslation} from "react-i18next";

import RelatedObjectsContext from "../RelatedObjectsContext";

import ZipMenu from "./ZipMenu";

const ExtraOptions = () => {
    const {
        submissions,
    } = useContext(RelatedObjectsContext);
    const {t} = useTranslation();

    const [isZipMenuOpen, setIsZipMenuOpen] = useState<boolean>(false);

    return (
        <>
            <Paper>
                <Box p={3}>
                    <Button
                        startIcon={<AiFillFileZip />}
                        onClick={() => setIsZipMenuOpen(true)}
                    >
                        {t("Als Zip runterladen")}
                    </Button>
                </Box>
            </Paper>
            <ZipMenu
                submissions={submissions}
                isOpen={isZipMenuOpen}
                onClose={() => setIsZipMenuOpen(false)}
            />
        </>
    );
};

export default ExtraOptions;
