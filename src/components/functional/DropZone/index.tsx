import React, {ReactNode} from "react";
import {
    Box,
    Collapse,
    Paper, Typography,
} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {MdAdd, MdFileUpload} from "react-icons/all";
import {usePrettyBytes, usePrevious} from "hooks";

import Information from "../Information";

import useDropZone, {MAX_FILE_SIZE} from "./useDropZone";
import useMainColor from "./useMainColor";


export interface IDropZone<FileType = any> {
    files: FileType[];
    onFilesAdded: (files: File[]) => any;

    renderList: (element: FileType[]) => ReactNode;

    disabled?: boolean;
    acceptedFormats?: string[];
    maxFiles?: number;
}

const DropZone = <FileType extends any = any>({
    files,
    onFilesAdded,
    renderList,
    disabled,
}: IDropZone<FileType>) => {
    const {t} = useTranslation();
    const prettyBytes = usePrettyBytes();
    const {
        inputProps,
        rootProps,
        isDragActive,
    } = useDropZone({
        onFilesAdded,
    });
    const previousValue = usePrevious(files, files);
    const mainColor = useMainColor({
        isDragActive,
    });

    return (
        <Paper elevation={0}>
            <Box {...rootProps}>
                <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    p={3}
                    width="100%"
                    my={0}
                    mx="auto"
                    border={`${mainColor} .2em dashed`}
                >
                    <input {...inputProps} disabled={disabled} />
                    {isDragActive ? (
                        <Information
                            getIcon={props => <MdAdd {...props} />}
                            text={t("Dateien hinzufügen")}
                            color="textPrimary"
                        />
                    ) : (
                        <Information
                            getIcon={props => <MdFileUpload {...props} />}
                            text={t("Dateien auswählen")}
                            color={disabled ? "textSecondary" : "textPrimary"}
                        />
                    )}
                    <Typography variant="body2" color="textSecondary">
                        {t("Maximale Dateigröße: {{maxSize}}", {
                            maxSize: prettyBytes(MAX_FILE_SIZE),
                        })}
                    </Typography>
                </Box>
            </Box>
            <Collapse in={Boolean(files.length)}>
                <Box m={2}>
                    {renderList(files.length ? files : previousValue)}
                </Box>
            </Collapse>
        </Paper>
    );
};

export default DropZone;
