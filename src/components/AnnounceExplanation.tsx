import React from "react";
import {useTranslation} from "react-i18next";
import {SimpleDialog} from "components/index";
import {DialogContentText} from "@material-ui/core";

export interface AnnounceExplanationProps {
    isOpen: boolean;
    onClose: () => any;
}

const AnnounceExplanation = ({
    isOpen,
    onClose,
}: AnnounceExplanationProps) => {
    const {t} = useTranslation();

    return (
        <SimpleDialog
            isOpen={isOpen}
            primaryButton={null}
            title={t("Material ankündigen")}
            onClose={onClose}
        >
            <DialogContentText>
                <p>
                    {t("Die Ankündigung erlaubt es Schülern, zu sehen, dass Material verfügbar ist. " +
                            "Dabei können sie nur sehen, dass ein Material existiert. " +
                            "Zugriff erhalten sie trotz der Ankündigung erst nach der Veröffentlichung.")}
                </p>
                <p>
                    {t("Sobald einmal angekündigt, können Ankündigungen nicht zurückgenommen werden.")}
                </p>
            </DialogContentText>
        </SimpleDialog>
    );
};

export default AnnounceExplanation;
