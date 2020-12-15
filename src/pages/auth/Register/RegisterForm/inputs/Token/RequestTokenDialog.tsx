import {APP_NAME, CONTACT_EMAIL, CONTACT_NUMBER} from "react_constants";
import React, {memo, useCallback, useMemo} from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItem,
    ListItemIcon,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
} from "@material-ui/core";
import {Trans, useTranslation} from "react-i18next";
import {FaSmile, FaWhatsapp, MdEmail} from "react-icons/all";
import {PrimaryButton} from "components/buttons";

export interface IRequestTokenDialog {
    open: boolean;
    onClose: () => any;
}

const RequestTokenDialog = ({open, onClose}: IRequestTokenDialog) => {
    const {t} = useTranslation();
    const medias = useMemo(() => [
        {
            getIcon(props) {
                return <FaWhatsapp {...props} />;
            },
            name: "Whatsapp",
            color: "#25D366",
            address: `https://wa.me/${CONTACT_NUMBER}`,
        },
        {
            getIcon(props) {
                return <MdEmail {...props} />;
            },
            name: t("E-Mail"),
            color: "#888",
            address: `mailto:${CONTACT_EMAIL}`,
        },
        {
            getIcon(props) {
                return <FaSmile {...props} />;
            },
            name: t("Realität"),
            color: "#ffbf00",
        },
    ], [t]);
    const renderMedia = useCallback(media =>
        <ListItem
            key={media.name} {...(media.address && {button: true})}
            onClick={() => {
                if (media.address) {
                    window.open(media.address, "_blank");
                }
            }}
        >
            <ListItemIcon>
                {media.getIcon({color: media.color})}
            </ListItemIcon>
            <Typography color="textPrimary">{media.name}</Typography>
        </ListItem>
    , []);

    return (
        <Dialog open={open} onBackdropClick={onClose}>
            <DialogTitle>{t("Zugangscode holen")}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Trans>
                        {{APP_NAME}} ist für uns Schüler entwickelt.
                        Lehrer, Eltern, Schulleiter und andere Menschen außerhalb der Schule bekommen <strong>keinen Zugang</strong>.
                        Damit wir wissen, dass du ein Schüler bist, musst du einen <strong>Token</strong> angeben.
                    </Trans>
                </DialogContentText>
                <DialogContentText>
                    <Trans>
                        Die Registrierung sieht wie folgt aus:
                    </Trans>
                </DialogContentText>
                <Stepper orientation="vertical" activeStep={0}>
                    <Step completed={false}>
                        <StepLabel>{t("Zugangscode holen")}</StepLabel>
                        <StepContent>
                            <Typography color="textSecondary">
                                <Trans>
                                    Hole dir einen Token über einen Admin.
                                    Admins können über folgende Medien erreicht werden:
                                </Trans>
                            </Typography>
                            <List>
                                {medias.map(renderMedia)}
                            </List>
                        </StepContent>
                    </Step>
                    <Step completed={false}>
                        <StepLabel>{t("Registrieren")}</StepLabel>
                    </Step>
                </Stepper>
            </DialogContent>
            <DialogActions>
                <PrimaryButton onClick={onClose}>{t("Schließen")}</PrimaryButton>
            </DialogActions>
        </Dialog>
    );
};

export default memo(RequestTokenDialog);
