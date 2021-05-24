import React from "react";
import {Dialog, DialogActions, DialogActionsProps, DialogContent, DialogTitle} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {PrimaryButton} from "components";

export interface FilterDialogProps {
    isOpen: boolean;
    children: DialogActionsProps["children"];
    onClose: () => any;
}

const FilterDialog = ({isOpen, children, onClose}: FilterDialogProps) => {
    const {t} = useTranslation();

    return (
        <Dialog open={isOpen} onBackdropClick={onClose}>
            <DialogTitle>
                {t("Filtern")}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <PrimaryButton onClick={onClose}>
                    {t("Schließen")}
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
};

export default FilterDialog;
