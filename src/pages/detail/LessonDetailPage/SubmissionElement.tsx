import React, {useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
import update from "immutability-helper";
import {PrimaryButton} from "components";

export interface ISubmissionElement {
    file: SubmissionFile;
    onChange: (newFile: SubmissionFile) => any;
    onDelete: () => any;
}

export interface SubmissionFile {
    nativeFile: File;
    uploadDate: Dayjs;
}

const wrapOverflowStyle = {
    overflowWrap: "anywhere" as "anywhere",
};

const SubmissionElement = ({file, onChange, onDelete}: ISubmissionElement) => {
    const {t} = useTranslation();

    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <ListItem key={file.nativeFile.name} button onClick={onDelete}>
                <ListItemAvatar>
                    <ExtensionAvatar name={file.nativeFile.name} />
                </ListItemAvatar>
                <ListItemText
                    style={wrapOverflowStyle}
                    primary={file.nativeFile.name}
                    secondary={prettyBytes(file.nativeFile.size, {
                        locale: "de",
                    })}
                />
                <ListItemSecondaryAction>
                    <Button
                        onClick={(event) => {
                            event.stopPropagation();
                            setShowModal(true);
                        }}
                    >
                        {file.uploadDate.format("DD.MM.YY HH:mm")}
                    </Button>
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
                            value={file.uploadDate}
                            format="lll"
                            onChange={date => date && onChange(update(file, {
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
