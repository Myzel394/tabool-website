import React, {memo, useContext} from "react";
import {Box, Typography} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";

import StartPageContext from "../StartPageContext";

import SingleModification from "./SingleModification";


const Modifications = () => {
    const {t} = useTranslation();
    const {
        dailyData: {
            modifications,
        },
    } = useContext(StartPageContext);

    if (!modifications.length) {
        return (
            <Alert severity="info">
                {t("Es gibt keine Veränderungen in naher Zukunft.")}
            </Alert>
        );
    }

    return (
        <>
            {modifications.map(modification =>
                (modification.lesson) &&
                    <div key={modification.id}>
                        <Box mb={1}>
                            <Typography variant="h6">
                                {modification.startDatetime.format("lll")}
                            </Typography>
                        </Box>
                        <SingleModification modification={modification} />
                    </div>)}
        </>
    );
};

export default memo(Modifications);
