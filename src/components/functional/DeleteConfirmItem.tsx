import React, {ReactNode, useState} from "react";
import {CircularProgress, DialogContentText, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {MdDeleteForever} from "react-icons/all";
import {useTranslation} from "react-i18next";

import {PrimaryButton} from "../buttons";

import {ICON_SIZE} from "./BottomSheet";
import SimpleDialog from "./SimpleDialog";

export interface DeleteConfirmItemProps {
    onDelete: any;

    isDeleting?: boolean;
    children?: ReactNode;
}

const DeleteConfirmItem = ({
    isDeleting,
    onDelete,
    children,
}: DeleteConfirmItemProps) => {
    const {t} = useTranslation();

    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

    return (
        <>
            <ListItem
                button
                disabled={isDeleting}
                onClick={() => setShowConfirmDialog(true)}
            >
                <ListItemIcon>
                    <MdDeleteForever size={ICON_SIZE} />
                </ListItemIcon>
                <ListItemText
                    primary={t("Löschen")}
                />
                {isDeleting && <CircularProgress color="inherit" size="1rem" />}
            </ListItem>
            <SimpleDialog
                isOpen={showConfirmDialog}
                primaryButton={(
                    <PrimaryButton
                        startIcon={<MdDeleteForever />}
                        onClick={() => {
                            setShowConfirmDialog(false);
                            onDelete();
                        }}
                    >
                        {t("Löschen")}
                    </PrimaryButton>
                )}
                title={t("Löschen")}
                onClose={() => setShowConfirmDialog(false)}
            >
                {children ? children : (
                    <DialogContentText>
                        {t("Bist du dir sicher, dass du das Element löschen möchtest?")}
                    </DialogContentText>
                )}
            </SimpleDialog>
        </>
    );
};

export default DeleteConfirmItem;
