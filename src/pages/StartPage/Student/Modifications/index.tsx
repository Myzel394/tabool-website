import React, {memo} from "react";
import {Box, Typography} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {StudentModificationDetail} from "types";
import {SingleModification} from "modules";

export interface ModificationsProps {
    modifications: StudentModificationDetail[];
}

const Modifications = ({
    modifications,
}: ModificationsProps) => {
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
                (modification.lesson) && (
                    <div key={modification.id}>
                        <Box mb={1}>
                            <Typography variant="h6">
                                {modification.lessonDate.format("lll")}
                            </Typography>
                        </Box>
                        <SingleModification
                            lesson={modification.lesson}
                            modificationType={modification.modificationType}
                            newSubject={modification.newSubject}
                        />
                    </div>
                ))}
        </>
    );
};

export default memo(Modifications);
