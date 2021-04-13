import {allowedDomains} from "constants/videoConference";

import React, {useCallback, useState} from "react";
import {
    Backdrop,
    Box,
    CircularProgress,
    ListItem,
    ListItemIcon,
    ListItemText,
    Portal,
    useTheme,
} from "@material-ui/core";
import {FaRegClipboard, MdCheck, MdClear} from "react-icons/all";
import {useAsync, useSnackbar} from "hooks";
import {useTranslation} from "react-i18next";
import {Alert} from "@material-ui/lab";
import {isIOS} from "react-device-detect";
import {truncate} from "utils";


export interface IInsertFromClipboard {
    isUpdating: boolean;
    setVideoConferenceLink: (link: string) => any;
    close: () => any;
}

const IS_URL_REGEX = new RegExp(`https://(${allowedDomains.join("|")}).*`);

const checkClipboardAccess = async (): Promise<boolean> => {
    if (!navigator.clipboard || !navigator.permissions) {
        return false;
    }

    try {
        const status = await navigator.permissions.query({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Not supported from Typescript yet
            name: "clipboard-read",
        });

        return status.state === "granted";
    } catch (err) {
        return false;
    }
};

const InsertFromClipboard = ({
    setVideoConferenceLink,
    close,
    isUpdating,
}: IInsertFromClipboard) => {
    const theme = useTheme();
    const {t} = useTranslation();
    const {addError, addWarning, addSnackbar, closeSnackbar, addSuccess} = useSnackbar();
    const getClipboardValue = useCallback(async () => {
        const hasClipboardAccess = await checkClipboardAccess();

        if (hasClipboardAccess) {
            try {
                const data = await navigator.clipboard.readText();
                return truncate(data, 30);
            } catch (err) {
                return "";
            }
        }

        return "";
    }, []);
    const {value: clipboardValue} = useAsync(getClipboardValue);
    const isURL = clipboardValue && IS_URL_REGEX.test(clipboardValue);

    const [isAsking, setIsAsking] = useState<boolean>(false);
    const [isClipboardDisabled, setIsClipboardDisabled] = useState<boolean>(false);

    const readLinkFromClipboard = async (): Promise<string | undefined> => {
        const data = await navigator.clipboard.readText();

        if (IS_URL_REGEX.test(data)) {
            return data;
        } else {
            // Invalid link
            addWarning(t("Es wurde kein gültiger Link in deiner Zwischenablage gefunden."));
        }
    };

    const showClipboardIsBlocked = () => {
        setIsClipboardDisabled(true);
        addError(
            undefined,
            t("Fehler beim Auslesen der Zwischenablage. Eventuell hast du keine Berechtigung erteilt."),
        );
    };

    const updateLink = async (link: string): Promise<void> => {
        const key = addSnackbar(t("Link wird aktualisiert..."), {
            variant: "info",
        });

        try {
            await setVideoConferenceLink(link);
            addSuccess(t("Link aktualisiert!"));
        } catch (error) {
            addError(t("Link konnte nicht aktualisiert werden."));
        } finally {
            closeSnackbar(key);
        }
    };

    return (
        <>
            <Portal container={document.body}>
                <Backdrop
                    open={isAsking}
                    style={{
                        position: "fixed",
                        left: 0,
                        top: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: theme.zIndex.modal + 1,
                    }}
                />
            </Portal>
            <ListItem
                button
                disabled={!isURL || isUpdating || isClipboardDisabled || !navigator.clipboard}
                onClick={async () => {
                    setIsAsking(true);

                    let link;

                    try {
                        link = await readLinkFromClipboard();
                    } catch (err) {
                        showClipboardIsBlocked();
                    } finally {
                        setIsAsking(false);
                        close();
                    }

                    if (link) {
                        await updateLink(link);
                    }
                }}
            >
                <ListItemIcon>
                    <FaRegClipboard size="1.5rem" />
                </ListItemIcon>
                <ListItemText
                    primary={t("Link aus Zwischenablage einfügen")}
                    secondary={clipboardValue && (
                        <Box display="flex" alignItems="center">
                            {(() => {
                                if (isURL) {
                                    return <MdCheck />;
                                } else {
                                    return <MdClear />;
                                }
                            })()}
                            <Box ml={1}>
                                {clipboardValue}
                            </Box>
                        </Box>
                    )}
                />
                {isUpdating && <CircularProgress color="inherit" size="1rem" />}
            </ListItem>
            {!navigator.clipboard && (
                <Alert severity="warning">
                    {isIOS ? t("Auf iOS leider nicht verfügbar.") : t("Dein Browser unterstützt dieses Feature nicht.")}
                </Alert>
            )}
        </>
    );
};

export default InsertFromClipboard;
