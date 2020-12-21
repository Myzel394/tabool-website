import React, {memo} from "react";
import {Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {Trans, useTranslation} from "react-i18next";
import {MdDeleteForever} from "react-icons/all";
import {PrimaryButton, SecondaryButton} from "components";

export interface IDeleteConfirmDialog {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;

    amount?: number;
    filename?: string | null;
}

const breakStyle = {
    wordBreak: "break-all" as "break-all",
};

const DeleteConfirmDialog = ({amount, filename, isOpen, onClose, onConfirm}: IDeleteConfirmDialog) => {
    const {t} = useTranslation();

    return (
        <Dialog open={isOpen}>
            <DialogTitle>
                {t("Datei löschen")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {filename
                        ? <Trans>
                            Möchtest du wirklich die Datei <Box m={2} style={breakStyle}><i>{{filename}}</i></Box> löschen?
                        </Trans>
                        : <Trans count={amount}>
                            Möchtest du wirklich <strong>{{amount}}</strong> Dateien löschen?
                        </Trans>
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <PrimaryButton onClick={onConfirm}>
                    <MdDeleteForever />
                    {t("Löschen")}
                </PrimaryButton>
                <SecondaryButton onClick={onClose}>
                    {t("Abbrechen")}
                </SecondaryButton>
            </DialogActions>
        </Dialog>
    );
};

export default memo(DeleteConfirmDialog);
