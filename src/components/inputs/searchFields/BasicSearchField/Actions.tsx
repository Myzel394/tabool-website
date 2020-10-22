import React, {memo} from "react";
import {PrimaryButton, SecondaryButton} from "components/buttons";
import {DialogActions} from "@material-ui/core";
import {useTranslation} from "react-i18next";

export interface IActions {
    canConfirm: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const Actions = ({onConfirm, onClose, canConfirm}: IActions) => {
    const {t} = useTranslation();

    return (
        <DialogActions>
            <SecondaryButton onClick={onClose}>
                {t("Schließen")}
            </SecondaryButton>
            <PrimaryButton disabled={!canConfirm} onClick={onConfirm}>
                {t("Bestätigen")}
            </PrimaryButton>
        </DialogActions>
    );
};

export default memo(Actions);
