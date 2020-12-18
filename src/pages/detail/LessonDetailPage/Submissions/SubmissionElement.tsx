import React, {useState} from "react";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from "@material-ui/core";
import ExtensionAvatar from "components/DropZone/ExtensionAvatar";
import prettyBytes from "pretty-bytes";
import dayjs, {Dayjs} from "dayjs";
import {useTranslation} from "react-i18next";
import {DateTimePicker} from "@material-ui/pickers";
import {PrimaryButton} from "components";
import {MdSettings} from "react-icons/all";
import update from "immutability-helper";

export interface Settings {
    uploadDate: Dayjs;
}

export interface ISubmissionElement {
    filename: string;
    fileSize: number;
    fileSettings: Settings;
    onSettingsChange: (newSettings: Settings) => any;
    onDelete: () => any;
}

const wrapOverflowStyle = {
    overflowWrap: "anywhere" as "anywhere",
};

const SubmissionElement = ({
    filename,
    fileSize,
    fileSettings,
    onSettingsChange,
    onDelete,
}: ISubmissionElement) => {
    const {t} = useTranslation();

    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <ListItem key={filename} button onClick={onDelete}>
                <ListItemAvatar>
                    <ExtensionAvatar name={filename} />
                </ListItemAvatar>
                <ListItemText
                    style={wrapOverflowStyle}
                    primary={filename}
                    secondary={prettyBytes(fileSize, {
                        locale: "de",
                    })}
                />
                <ListItemSecondaryAction>
                    <IconButton onClick={() => setShowModal(true)}>
                        <MdSettings />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Dialog open={showModal} onBackdropClick={() => setShowModal(false)}>
                <DialogTitle>
                    {t("Hochladedatum auswählen")}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="textSecondary">
                        {t("Hochgeladene Dateien werden von tabool nicht direkt auf Scooso hochgeladen. Du kannst auswählen, wann die Datei automatisch auf Scooso hochgeladen werden soll.")}
                    </Typography>
                    <Box mt={3} display="flex" justifyContent="center">
                        <DateTimePicker
                            disablePast
                            inputVariant="outlined"
                            value={fileSettings.uploadDate}
                            format="lll"
                            onChange={date => date && onSettingsChange(update(fileSettings, {
                                uploadDate: {
                                    $set: dayjs(date),
                                },
                            }))}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <PrimaryButton onClick={() => setShowModal(false)}>
                        {t("Schließen")}
                    </PrimaryButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SubmissionElement;
