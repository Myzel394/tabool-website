import React, {useState} from "react";
import {SubmissionDetail} from "types";
import {
    CircularProgress,
    Link,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from "@material-ui/core";
import {MdCloudUpload, MdDeleteForever, MdFileDownload, MdSettings} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {BottomSheetAction} from "components";

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
            <BottomSheetAction
                title={submission.filename}
                description={t("Eingestellt am {{date}}", {
                    date: submission.createdAt.format("LLL"),
                })}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ListItem
                    button
                    disabled={submission.isUploaded || isFileUploading}
                    onClick={() => {
                        onClose();
                        onShowSettings();
                    }}
                >
                    <ListItemIcon>
                        <MdSettings size="1.5rem" />
                    </ListItemIcon>
                    <ListItemText>
                        {t("Einstellungen")}
                    </ListItemText>
                </ListItem>
                <Link download underline="none" color="inherit" href={submission.file}>
                    <ListItem button>
                        <ListItemIcon>
                            <MdFileDownload size="1.5rem" />
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
                        <MdCloudUpload size="1.5rem" />
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
                        <MdDeleteForever size="1.5rem" />
                    </ListItemIcon>
                    <ListItemText>
                        {t("Datei löschen")}
                    </ListItemText>
                </ListItem>
            </BottomSheetAction>
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
