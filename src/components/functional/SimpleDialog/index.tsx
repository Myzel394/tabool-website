import React, {ExoticComponent} from "react";
import {Dialog, DialogActions, DialogContent, DialogProps, DialogTitle} from "@material-ui/core";
import {useTranslation} from "react-i18next";

import {SecondaryButton} from "../../buttons";

import SlideTransition from "./SlideTransition";
import FadeTransition from "./FadeTransition";

type AvailableAnimations = "slide" | "fade";

export interface ISimpleDialog extends Omit<DialogProps, "open"> {
    isOpen: DialogProps["open"];
    onClose: () => any;
    primaryButton: JSX.Element | null;
    title: string;

    transition?: AvailableAnimations;
    secondaryButton?: JSX.Element;
}

const TRANSITION_MAPPING: Record<AvailableAnimations, ExoticComponent> = {
    slide: SlideTransition,
    fade: FadeTransition,
};

const SimpleDialog = ({
    isOpen,
    onClose,
    primaryButton,
    title,
    children,
    transition,
    secondaryButton,
    ...other
}: ISimpleDialog) => {
    const {t} = useTranslation();

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={transition ? TRANSITION_MAPPING[transition] : undefined}
            onBackdropClick={onClose}
            {...other}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                {secondaryButton ? secondaryButton : (
                    <SecondaryButton onClick={onClose}>
                        {t("Schließen")}
                    </SecondaryButton>
                )}
                {primaryButton}
            </DialogActions>
        </Dialog>
    );
};

export default SimpleDialog;
