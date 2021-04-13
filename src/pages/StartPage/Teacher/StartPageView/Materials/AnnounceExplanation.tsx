import React, {useState} from "react";
import {MdInfo} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {SimpleDialog} from "components";
import {DialogContentText, IconButton} from "@material-ui/core";


export interface IAnnounceExplanation {
    isAnnounced: boolean;
}

const AnnounceExplanation = ({
    isAnnounced,
}: IAnnounceExplanation) => {
    const {t} = useTranslation();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            {t("Ankündigen")}
            <IconButton size="small" edge="end" onClick={() => setIsOpen(true)} >
                <MdInfo />
            </IconButton>
            <SimpleDialog
                isOpen={isOpen}
                primaryButton={null}
                title={t("Material ankündigen")}
                onClose={() => setIsOpen(false)}
            >
                <DialogContentText>
                    <p>
                        {t("Die Ankündigung erlaubt es Schülern, zu sehen, dass Material verfügbar ist. " +
                            "Dabei können sie nur sehen, dass ein Material existiert. " +
                            "Zugriff erhalten sie trotz der Ankündigung erst nach der Veröffentlichung.")}
                    </p>
                    {isAnnounced && (
                        <p>
                            {t("Sobald einmal angekündigt, kann ein Material nicht mehr privat gestellt werden.")}
                        </p>
                    )}
                </DialogContentText>
            </SimpleDialog>
        </>
    );
};

export default AnnounceExplanation;
