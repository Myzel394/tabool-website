import React, {forwardRef, useContext, useEffect, useImperativeHandle, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Badge,
    Box,
    Button,
    CircularProgress,
    makeStyles,
    Typography,
} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {MdMoreHoriz} from "react-icons/all";
import tinycolor from "tinycolor2";

import FileListContext from "../FileListContext";

import Materials from "./Materials";
import useFetchMaterials from "./useFetchMaterials";


export interface ICourseMaterials {
    courseName: string;
    courseId: string;
    color: string;
}

const useClasses = makeStyles(theme => ({
    wrapper: {
        width: "100%",
    },
    color: {
        width: ".8rem",
        height: ".8rem",
        borderRadius: theme.shape.borderRadius,
        marginRight: theme.spacing(1),
    },
    details: {
        backgroundColor: theme.palette.background.default,
        "& > div": {
            width: "100%",
            "& > div": {
                width: "100%",
            },
        },
    },
}));

export interface CourseMaterialsReference {
    materialsAmount: number;
}

const CourseMaterials = ({
    courseId,
    color,
    courseName,
}: ICourseMaterials, ref) => {
    const {t} = useTranslation();
    const classes = useClasses();
    const {
        search,
    } = useContext(FileListContext);
    const {
        amount,
        materials,
        queryData: {
            hasNextPage,
            isFetchingNextPage,
            fetchNextPage,
        },
    } = useFetchMaterials(courseId);

    const [open, setOpen] = useState<boolean>(false);

    const badgeAmount = (() => {
        const allAmount = materials.length;
        // Shows user whether there is more available
        const addValue = Number(Boolean(hasNextPage));

        if (allAmount !== amount) {
            // User has applied subtractions
            if (amount === 0) {
                // Ensures dot
                return undefined;
            }
            return amount + addValue;
        }

        return allAmount + addValue;
    })();

    useImperativeHandle(ref, (): CourseMaterialsReference => ({
        materialsAmount: materials.length,
    }));

    // When element is in search available, open accordion
    useEffect(() => {
        if (search && materials.length) {
            setOpen(true);
        }
    }, [search, materials.length]);

    return (
        <Accordion
            className={classes.wrapper}
            expanded={open}
            onChange={() => setOpen(prevState => !prevState)}
        >
            <AccordionSummary>
                <Box display="flex" alignItems="center">
                    <div
                        style={{
                            backgroundColor: tinycolor(color).toString(),
                        }}
                        className={classes.color}
                    />
                    <Badge
                        badgeContent={badgeAmount}
                        color="secondary"
                        variant={materials.length !== amount && amount === 0 ? "dot" : "standard"}
                        max={hasNextPage ? amount : 99}
                    >
                        <Typography variant="h5">
                            {courseName}
                        </Typography>
                    </Badge>
                </Box>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Materials materials={materials} />
                    {!isFetchingNextPage && hasNextPage && (
                        <Button startIcon={<MdMoreHoriz />} onClick={() => fetchNextPage()}>
                            {t("Weitere laden")}
                        </Button>
                    )}
                    {isFetchingNextPage && <CircularProgress color="inherit" />}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default forwardRef(CourseMaterials);
