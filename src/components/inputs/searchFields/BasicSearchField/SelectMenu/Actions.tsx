import React, {memo} from "react";
import {PrimaryButton, SecondaryButton} from "components/buttons";
import {DialogActions, Tooltip} from "@material-ui/core";
import {useTranslation} from "react-i18next";

export interface IActions {
    canConfirm: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const Actions = ({onConfirm, onClose, canConfirm}: IActions) => {
    const {t} = useTranslation();
    const primaryButton =
        <PrimaryButton disabled={!canConfirm} onClick={onConfirm}>
            {t("Bestätigen")}
        </PrimaryButton>;
    return (
        <DialogActions>
            <SecondaryButton onClick={onClose}>
                {t("Schließen")}
            </SecondaryButton>
            {canConfirm
                ? primaryButton
                : <Tooltip title={t("Wähle zuerst ein Element aus").toString()} enterTouchDelay={0}>
                    <span key="button">
                        {primaryButton}
                    </span>
                </Tooltip>
            }
        </DialogActions>
    );
};

export default memo(Actions);
