import React, {useMemo, useState} from "react";
import {Dayjs} from "dayjs";
import {
    DialogContentText,
    IconButton,
    LinearProgress,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
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
import {PrimaryButton, SimpleDialog} from "components";
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
    const suffixMessage = isThis ? t(" (Dieses Gerät)") : "";
    const uaInstance = useMemo(() => new UAParser(userAgent), [userAgent]);
    const vendor = uaInstance.getDevice().vendor?.toLowerCase?.();
    const Icon = vendor && DEVICE_VENDOR_ICON_MAP[vendor];

    return (
        <>
            <ListItem key={id} disabled={isLoading}>
                <ListItemIcon>
                    {Icon && <Icon size="2rem" />}
                </ListItemIcon>
                <ListItemText
                    inset={!Icon}
                    primaryTypographyProps={{
                        color: isThis ? "primary" : "textPrimary",
                    }}
                    primary={ip + suffixMessage}
                    secondary={t("Letzte Aktivität: {{lastActivity}}", {
                        lastActivity: lastActivity.format("LLL"),
                    })}
                />
                <ListItemSecondaryAction>
                    <IconButton disabled={isThis} edge="end" onClick={() => setConfirmDelete(true)}>
                        <MdDelete />
                    </IconButton>
                </ListItemSecondaryAction>
                {isLoading && <LinearProgress />}
            </ListItem>
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
                    {t("Möchtest du dieses Gerät entfernen? " +
                        "Du musst dich dann auf diesem Gerät dann wieder anmelden, um Zugriff zu erhalten.")}
                </DialogContentText>
                <Alert severity="info">
                    {t("Wenn dir dieses Gerät nicht bekannt ist, solltest du es dringend entfernen.")}
                </Alert>
            </SimpleDialog>
        </>
    );
};

export default Session;
