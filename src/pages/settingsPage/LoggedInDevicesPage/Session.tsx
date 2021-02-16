import React, {useMemo, useState} from "react";
import {Dayjs} from "dayjs";
import {
    DialogContentText,
    Grid,
    IconButton,
    LinearProgress,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from "@material-ui/core";
import {
    FaApple,
    FaGoogle,
    FaMicrosoft,
    MdDelete,
    SiAsus,
    SiDell,
    SiHp,
    SiHuawei,
    SiLg,
    SiOneplus,
    SiSamsung,
    SiXiaomi,
} from "react-icons/all";
import {AxiosError} from "axios";
import {Alert} from "@material-ui/lab";
import {PrimaryButton, SimpleDialog, TimeRelative} from "components";
import {useDeleteSessionAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {useTranslation} from "react-i18next";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {useSnackbar} from "hooks";
import UAParser from "ua-parser-js";


export interface ISession {
    id: string;
    lastActivity: Dayjs;
    userAgent: string;
    ip: string;
    isThis: boolean;

    onDelete?: () => any;
}

const DEVICE_VENDOR_ICON_MAP = {
    apple: FaApple,
    asus: SiAsus,
    dell: SiDell,
    google: FaGoogle,
    hp: SiHp,
    huawei: SiHuawei,
    microsoft: FaMicrosoft,
    oneplus: SiOneplus,
    lg: SiLg,
    samsung: SiSamsung,
    xiaomi: SiXiaomi,
};

const Session = ({
    id,
    ip,
    isThis,
    lastActivity,
    userAgent,
    onDelete,
}: ISession) => {
    const {t} = useTranslation();
    const deleteSession = useDeleteSessionAPI();
    const {addError} = useSnackbar();

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const {
        mutate,
        isLoading,
    } = useMutation<void, AxiosError, any>(
        () => deleteSession(id),
        {
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
            onSuccess: onDelete,
        },
    );
    const uaInstance = useMemo(() => new UAParser(userAgent), [userAgent]);
    const vendor = uaInstance.getDevice().vendor?.toLowerCase?.();
    const Icon = vendor && DEVICE_VENDOR_ICON_MAP[vendor];

    return (
        <>
            <ListItem
                key={id}
                button
                disabled={isLoading}
                onClick={() => setShowDetails(true)}
            >
                <ListItemIcon>
                    {Icon && <Icon size="2rem" />}
                </ListItemIcon>
                <TimeRelative>
                    {now =>
                        <ListItemText
                            primaryTypographyProps={{
                                color: isThis ? "primary" : "textPrimary",
                            }}
                            primary={t("{{browserName}} ({{browserVersion}}) auf einem {{os}}-Gerät", {
                                browserName: uaInstance.getBrowser().name,
                                browserVersion: uaInstance.getBrowser().version,
                                os: uaInstance.getOS().name,
                            }) + (isThis ? ` ${t(" (Dieses Gerät)")}` : "")}
                            secondary={t("Letzte Aktivität {{lastActivity}}", {
                                lastActivity: now.to(lastActivity),
                            })}
                        />}
                </TimeRelative>
                <ListItemSecondaryAction>
                    <IconButton disabled={isThis} edge="end" onClick={() => setConfirmDelete(true)}>
                        <MdDelete />
                    </IconButton>
                </ListItemSecondaryAction>
                {isLoading && <LinearProgress />}
            </ListItem>
            <SimpleDialog
                isOpen={showDetails}
                primaryButton={null}
                title={t("Details")}
                onClose={() => setShowDetails(false)}
            >
                <Grid container spacing={2} component="dl">
                    <Grid item>
                        <Typography variant="body1" component="dd">
                            {t("IP-Adresse")}
                        </Typography>
                        <Typography variant="body2" component="dt" color="textSecondary">
                            {ip}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" component="dd">
                            {t("User-Agent")}
                        </Typography>
                        <Typography variant="body2" component="dt" color="textSecondary">
                            {userAgent}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" component="dd">
                            {t("Letzte Aktivität")}
                        </Typography>
                        <Typography variant="body2" component="dt" color="textSecondary">
                            {lastActivity.format("LLL")}
                        </Typography>
                    </Grid>
                </Grid>
            </SimpleDialog>
            <SimpleDialog
                isOpen={confirmDelete}
                primaryButton={
                    <PrimaryButton onClick={mutate}>
                        {t("Entfernen")}
                    </PrimaryButton>}
                title={t("Gerät entfernen")}
                onClose={() => setConfirmDelete(false)}
            >
                <DialogContentText>
                    {t("Möchtest du dieses Gerät entfernen? Du musst deine Anmeldedaten erneut eingeben, um von diesem Gerät wieder zuzugreifen.")}
                </DialogContentText>
                <Alert severity="info">
                    {t("Wenn dir dieses Gerät nicht bekannt ist, solltest du es dringend entfernen.")}
                </Alert>
            </SimpleDialog>
        </>
    );
};

export default Session;
