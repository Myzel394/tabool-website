import React, {memo} from "react";
import {useTranslation} from "react-i18next";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import useUniqueId from "hooks/useUniqueId";

import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";


export interface IConfirmationDialog {
    open: boolean;

    onConfirm: () => void;
    onCancel: () => void;

    title?: string;
    content?: string;
    goBackButtonContent?: string;
    cancelButtonContent?: string;
}


const ConfirmationDialog = (props: IConfirmationDialog) => {
    const {t} = useTranslation();
    const titleId = useUniqueId("title", "modal"),
        contentId = useUniqueId("content", "modal");

    const {
        title = t("Zurück gehen?"),
        content = t("Bist du dir sicher, dass du zurück gehen möchtest? Nicht gespeicherte Veränderungen könnten verloren gehen."),
        goBackButtonContent = t("Zurück gehen"),
        cancelButtonContent = t("Abbrechen"),
        open,
        onCancel,
        onConfirm,
    } = props;

    return (
        <Dialog
            open={open}
            onBackdropClick={onCancel}
            aria-labelledby={titleId}
            aria-describedby={contentId}
        >
            <DialogTitle id={titleId}>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id={contentId}>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <SecondaryButton onClick={onConfirm}>
                    {goBackButtonContent}
                </SecondaryButton>
                <PrimaryButton onClick={onCancel}>
                    {cancelButtonContent}
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
};

export default memo(ConfirmationDialog);
