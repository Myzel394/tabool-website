import React from "react";
import {ModificationDetail} from "types";
import {Box, Grid, Typography} from "@material-ui/core";
import {ModificationType} from "api";
import {useTranslation} from "react-i18next";
import {MdArrowForward} from "react-icons/all";

import Avatar from "../Avatar";


export interface ISingleModification {
    modification: ModificationDetail;
}


const SingleModification = ({
    modification,
}: ISingleModification) => {
    const {t} = useTranslation();

    if (!modification.lesson) {
        return null;
    }

    const avatar = <Avatar lesson={modification.lesson} />;
    const typeMap = {
        [ModificationType.RoomChange]: t("Raumänderung"),
        [ModificationType.SelfLearn]: t("Selbstorganisiertes Lernen"),
        [ModificationType.FreePeriod]: t("Freistunde"),
        [ModificationType.Replacement]: t("Veränderung"),
    };
    const icon = (() => {
        switch (modification.modificationType) {
            case ModificationType.FreePeriod:
                return (
                    <div
                        style={{
                            filter: "grayscale(100%)",
                        }}
                    >
                        {avatar}
                    </div>);
            case ModificationType.Replacement:
                return (
                    <Avatar subject={modification.newSubject ?? modification.lesson?.lessonData?.course?.subject} />
                );
            case ModificationType.SelfLearn:
                return (
                    <div
                        style={{
                            filter: "grayscale(100%)",
                        }}
                    >
                        {avatar}
                    </div>);
            case ModificationType.RoomChange:
                return avatar;
        }
        return null;
    })();

    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item>
                {avatar}
            </Grid>
            <Grid item>
                <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                    <Typography variant="body2" color="textSecondary">
                        {typeMap[modification.modificationType]}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        <MdArrowForward size="1.5rem" />
                    </Typography>
                </Box>
            </Grid>
            <Grid item>
                {icon}
            </Grid>
        </Grid>
    );
};

export default SingleModification;
