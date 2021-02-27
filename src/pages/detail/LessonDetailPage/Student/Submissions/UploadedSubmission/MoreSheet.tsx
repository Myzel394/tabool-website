import React, {useState} from "react";
import {StudentSubmissionDetail} from "types";
import {Link, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {MdDeleteForever, MdFileDownload, MdFileUpload, MdSettings} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {BottomSheetAction} from "components";

import DeleteConfirmDialog from "./DeleteConfirmDialog";

export interface IMoreSheet {
    submission: StudentSubmissionDetail;
    isOpen: boolean;
    isFileUploading: boolean;
    onClose: () => any;

    // Actions
    onDelete: () => any;
    onShowSettings: () => any;
    onUpload: () => any;
}

const MoreSheet = ({
    isOpen,
    onClose,
    onDelete,
    submission,
    onShowSettings,
    isFileUploading,
    onUpload,
}: IMoreSheet) => {
    const {t} = useTranslation();

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);

    return (
        <>
            <BottomSheetAction
                title={submission.name}
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
                        onUpload();
                    }}
                >
                    <ListItemIcon>
                        <MdFileUpload size="1.5rem" />
                    </ListItemIcon>
                    <ListItemText>
                        {t("Datei hochladen")}
                    </ListItemText>
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
                filename={submission.name}
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
