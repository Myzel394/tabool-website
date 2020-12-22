import React, {useState} from "react";
import {SubmissionDetail} from "types";
import {
    Box,
    CircularProgress,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from "@material-ui/core";
import {MdCloudUpload, MdDeleteForever, MdFileDownload, MdSettings} from "react-icons/all";
import {useTranslation} from "react-i18next";

import {BottomSheet} from "../../../../../components";

import DeleteConfirmDialog from "./DeleteConfirmDialog";

export interface IMoreSheet {
    submission: SubmissionDetail;
    isOpen: boolean;
    isFileUploading: boolean;
    onClose: () => any;

    // Actions
    onDelete: () => any;
    onShowSettings: () => any;
    onUploadToScooso: () => any;
}

const wordBreakStyle = {
    wordBreak: "break-all" as "break-all",
};
const iconSize = "1.5rem";


const MoreSheet = ({
    isOpen,
    onClose,
    onDelete,
    submission,
    onShowSettings,
    onUploadToScooso,
    isFileUploading,
}: IMoreSheet) => {
    const {t} = useTranslation();

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);

    return (
        <>
            <BottomSheet
                isOpen={isOpen}
                onClose={onClose}
            >
                <Box m={2}>
                    <Typography variant="h5" style={wordBreakStyle}>
                        {submission.filename}
                    </Typography>
                </Box>
                <List>
                    <ListItem
                        button
                        onClick={() => {
                            onClose();
                            onShowSettings();
                        }}
                    >
                        <ListItemIcon>
                            <MdSettings size={iconSize} />
                        </ListItemIcon>
                        <ListItemText>
                            {t("Einstellungen")}
                        </ListItemText>
                    </ListItem>
                    <Link download underline="none" color="inherit" href={submission.file}>
                        <ListItem button>
                            <ListItemIcon>
                                <MdFileDownload size={iconSize} />
                            </ListItemIcon>
                            <ListItemText>
                                {t("Datei runterladen")}
                            </ListItemText>
                        </ListItem>
                    </Link>
                    <ListItem
                        button
                        disabled={submission.isUploaded || isFileUploading}
                        onClick={() => {
                            onClose();
                            onUploadToScooso();
                        }}
                    >
                        <ListItemIcon>
                            <MdCloudUpload size={iconSize} />
                        </ListItemIcon>
                        <ListItemText>
                            {t("Datei auf Scooso hochladen")}
                        </ListItemText>
                        {isFileUploading &&
                                <ListItemSecondaryAction>
                                    <CircularProgress color="inherit" size="1rem" />
                                </ListItemSecondaryAction>
                        }
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            setShowDeleteConfirmation(true);
                            onClose();
                        }}
                    >
                        <ListItemIcon>
                            <MdDeleteForever size={iconSize} />
                        </ListItemIcon>
                        <ListItemText>
                            {t("Datei löschen")}
                        </ListItemText>
                    </ListItem>
                </List>
            </BottomSheet>
            <DeleteConfirmDialog
                filename={submission.filename}
                isOpen={showDeleteConfirmation}
                onClose={() => setShowDeleteConfirmation(false)}
                onConfirm={() => {
                    setShowDeleteConfirmation(false);
                    onDelete();
                }}
            />
        </>
    );
};

export default MoreSheet;
