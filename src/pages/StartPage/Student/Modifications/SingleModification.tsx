import React from "react";
import {StudentModificationDetail} from "types";
import {Box, Grid, Typography} from "@material-ui/core";
import {ModificationType} from "api";
import {useTranslation} from "react-i18next";
import {FaLongArrowAltRight} from "react-icons/all";

import Avatar from "../Avatar";


export interface ISingleModification {
    modification: StudentModificationDetail;
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
                if (modification.newSubject) {
                    return <Avatar subject={modification.newSubject} />;
                }

                return avatar;
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
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{
                            fontWeight: 900,
                        }}
                    >
                        {typeMap[modification.modificationType]}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        <FaLongArrowAltRight size="2rem" />
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
