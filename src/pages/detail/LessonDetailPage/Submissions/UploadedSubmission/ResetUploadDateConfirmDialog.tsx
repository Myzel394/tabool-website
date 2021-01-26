import React from "react";
import {Box, DialogContentText} from "@material-ui/core";
import {Trans, useTranslation} from "react-i18next";
import {PrimaryButton, SimpleDialog} from "components";

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
        <SimpleDialog
            isOpen={isOpen}
            primaryButton={
                <PrimaryButton onClick={onConfirm}>
                    {t("Zurücksetzen")}
                </PrimaryButton>
            }
            title={t("Hochladedaten zurücksetzen")}
            onClose={onClose}
        >
            <DialogContentText>
                {filename
                    ? <Trans>
                        Möchtest du wirklich das Hochladedatum der Datei
                        <Box
                            m={2}
                            style={breakStyle}
                        >
                            <i>{{filename}}</i>
                        </Box> zurücksetzen?
                    </Trans>
                    : <Trans count={amount}>
                        Möchtest du wirklich die Hochladedaten <strong>{{amount}}</strong> Dateien zurücksetzen?
                    </Trans>
                }
            </DialogContentText>
        </SimpleDialog>
    );
};

export default DeleteConfirmDialog;
