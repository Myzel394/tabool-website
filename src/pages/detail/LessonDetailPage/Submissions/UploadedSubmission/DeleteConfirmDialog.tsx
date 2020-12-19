import React, {memo} from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {Trans, useTranslation} from "react-i18next";
import {MdDeleteForever} from "react-icons/all";
import {PrimaryButton, SecondaryButton} from "components";

export interface IDeleteConfirmDialog {
    isOpen: boolean;
    onClose: () => void;
    onContinue: () => void;

    amount?: number;
    filename?: string;
}

const dialogContent = {
    wordBreak: "break-all" as "break-all",
};

const DeleteConfirmDialog = ({amount, filename, isOpen, onClose}: IDeleteConfirmDialog) => {
    const {t} = useTranslation();

    return (
        <Dialog open={isOpen}>
            <DialogTitle>
                {t("Datei löschen")}
            </DialogTitle>
            <DialogContent style={dialogContent}>
                <DialogContentText>
                    {filename
                        ? <Trans>
                            Möchtest du wirklich die Datei <i>{{filename}}</i> löschen
                        </Trans>
                        : <Trans count={amount}>
                            Möchtest du wirklich {{amount}} Dateien löschen?
                        </Trans>
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <PrimaryButton>
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
