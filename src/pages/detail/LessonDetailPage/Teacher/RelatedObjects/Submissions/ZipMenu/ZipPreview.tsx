import React from "react";
import {TeacherSubmissionDetail} from "types";
import {TreeView} from "@material-ui/lab";
import {AiFillFileZip, FaFolder} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {getExtension, getPerUniqueValue} from "utils";
import {Box, makeStyles, Typography} from "@material-ui/core";

import {
    EXTENSION_TYPE_MAPPING,
    getTypeFromExtension,
    translateType,
    TYPES,
    ZipSubmissionsData,
} from "./downloadSubmissionsAsZip";
import StyledTreeItem from "./StyledTreeItem";

export interface ZipPreviewProps {
    variant: ZipSubmissionsData["variant"];
    submissions: TeacherSubmissionDetail[];
}

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.secondary,
    },
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        "$expanded > &": {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        "& $content": {
            paddingLeft: theme.spacing(2),
        },
    },
}));

const ZipPreview = ({
    variant,
    submissions,
}: ZipPreviewProps) => {
    const {t} = useTranslation();
    const classes = useStyles();

    return (
        <Box>
            <Typography variant="body1">
                {t("So sieht die Zip-Datei aus")}
            </Typography>
            <TreeView
                className={classes.root}
                expanded={[
                    "wrapper",
                    "other",
                    ...submissions.map(submission => submission.id),
                    ...submissions.map(submission => `${submission.student.firstName} ${submission.student.lastName}`),
                    ...Object.values(EXTENSION_TYPE_MAPPING),
                ]}
            >
                <StyledTreeItem
                    nodeId="wrapper"
                    text={t("Zip-Datei")}
                    icon={AiFillFileZip}
                >
                    {(() => {
                        switch (variant) {
                            case "prefix":
                                return submissions.map(
                                    submission =>
                                        <StyledTreeItem
                                            key={submission.id}
                                            nodeId={submission.id}
                                            filename={submission.name}
                                            text={`${submission.student.firstName}${submission.student.lastName}_${submission.name}`}
                                        />,
                                );
                            case "folder": {
                                const submissionsPerStudent = getPerUniqueValue(submissions, {
                                    getKey: submission => `${submission.student.firstName} ${submission.student.lastName}`,
                                });

                                return Object.entries(submissionsPerStudent).map(
                                    ([studentName, submissions]) =>
                                        <StyledTreeItem
                                            key={studentName}
                                            nodeId={studentName}
                                            text={studentName}
                                            icon={FaFolder}
                                        >
                                            {submissions.map(
                                                submission =>
                                                    <StyledTreeItem
                                                        key={submission.id}
                                                        nodeId={submission.id}
                                                        filename={submission.name}
                                                        text={submission.name}
                                                    />,
                                            )}
                                        </StyledTreeItem>,
                                );
                            }
                            case "extension": {
                                const submissionsPerType = getPerUniqueValue(submissions, {
                                    getKey: submission => {
                                        const extension = getExtension(submission.name);
                                        const type = getTypeFromExtension(extension);

                                        return type;
                                    },
                                });

                                return Object.entries(submissionsPerType).map(
                                    ([type, submissions]) =>
                                        <StyledTreeItem
                                            key={type}
                                            nodeId={type}
                                            text={translateType(type as TYPES, t)}
                                            icon={FaFolder}
                                        >
                                            {submissions.map(
                                                submission =>
                                                    <StyledTreeItem
                                                        key={submission.id}
                                                        nodeId={submission.id}
                                                        filename={submission.name}
                                                        text={`${submission.student.firstName}${submission.student.lastName}_${submission.name}`}
                                                    />,
                                            )}
                                        </StyledTreeItem>,
                                );
                            }
                        }
                    })()}
                </StyledTreeItem>
            </TreeView>
        </Box>
    );
};

export default ZipPreview;
