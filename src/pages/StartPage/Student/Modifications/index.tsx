import React, {memo} from "react";
import {Box, Typography} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {StudentModificationDetail} from "types";

import SingleModification from "./SingleModification";

export interface IModifications {
    modifications: StudentModificationDetail[];
}

const Modifications = ({
    modifications,
}: IModifications) => {
    const {t} = useTranslation();

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
                            {modification.lessonDate.format("lll")}
                        </Typography>
                    </Box>
                    <SingleModification modification={modification} />
                </div>)}
        </>
    );
};

export default memo(Modifications);
