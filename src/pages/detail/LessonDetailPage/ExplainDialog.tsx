import React from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link} from "@material-ui/core";
import {Trans, useTranslation} from "react-i18next";
import {PrimaryButton, SecondaryButton} from "components";
import {Alert} from "@material-ui/lab";
import {supportsWASM} from "supports";

export interface IExplainDialog {
    isOpen: boolean;
    onClose: () => any;
    onActivateCompression: () => any;
}

const ExplainDialog = ({isOpen, onClose, onActivateCompression}: IExplainDialog) => {
    const {t} = useTranslation();

    return (
        <Dialog open={isOpen} onBackdropClick={onClose}>
            <DialogTitle>
                {t("Bilder komprimieren")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Trans>
                        Dank moderner Technologie <Link href="https://webassembly.org/" target="_blank" rel="noopener noreferrer">(WebAssembly)</Link>{" "}
                        ist es heutzutage möglich sogar Bilder auf einem Smartphone,
                        anstatt auf dem Server, zu komprimieren.
                        Somit werden bis zu <strong>80% mobile Daten gespart</strong>.
                    </Trans>
                </DialogContentText>
                <DialogContentText>
                    {t("Leider ist diese Technologie noch nicht bei allen Browsern implementiert." +
                        " Momentan wird sie nur von der neuesten Chrome-Version unterstützt.")}
                </DialogContentText>
                <Alert severity={supportsWASM ? "success" : "error"}>
                    {supportsWASM
                        ? t("Dein Browser unterstützt WebAssembly!")
                        : t("Dein Browser unterstützt nicht WebAssembly")}
                </Alert>
            </DialogContent>
            <DialogActions>
                <PrimaryButton disabled={!supportsWASM} onClick={onActivateCompression}>
                    {t("Bildkomprimierung aktivieren")}
                </PrimaryButton>
                <SecondaryButton onClick={onClose}>
                    {t("Schließen")}
                </SecondaryButton>
            </DialogActions>
        </Dialog>
    );
};

export default ExplainDialog;
