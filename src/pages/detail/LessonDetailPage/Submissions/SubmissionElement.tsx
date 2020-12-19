import React, {useEffect, useState} from "react";
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
import {MdAdd, MdFileUpload, MdSettings} from "react-icons/all";
import update from "immutability-helper";
import {MdClose} from "react-icons/md";

import Day from "./UploadedSubmission/Day";

export interface Settings {
    uploadDate: Dayjs | null;
}

export interface ISubmissionElement {
    filename: string;
    fileSize: number;
    fileSettings: Settings;
    onSettingsChange: (newSettings: Settings) => any;
    onDelete: () => any;

    fileCreationDate?: Dayjs;
    lessonDateWeeks?: number[];
    lessonColor?: string;
}

const wrapOverflowStyle = {
    overflowWrap: "anywhere" as "anywhere",
};
const informationProps = {
    display: "flex",
    alignItems: "center",
};

const SubmissionElement = ({
    filename,
    fileSize,
    fileSettings,
    onSettingsChange,
    onDelete,
    fileCreationDate,
    lessonDateWeeks,
    lessonColor,
}: ISubmissionElement) => {
    const {t} = useTranslation();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [uploadDate, setUploadDate] = useState<Dayjs | null>(null);

    const saveChanges = () => {
        setShowModal(false);
        onSettingsChange(update(fileSettings, {
            uploadDate: {
                $set: uploadDate,
            },
        }));
    };

    const now = dayjs();

    // Update uploadDate
    useEffect(() => {
        setUploadDate(fileSettings.uploadDate);
    }, [fileSettings.uploadDate]);

    return (
        <>
            <ListItem key={filename} button onClick={onDelete}>
                <ListItemAvatar>
                    <ExtensionAvatar name={filename} />
                </ListItemAvatar>
                <ListItemText
                    style={wrapOverflowStyle}
                    primary={filename}
                    secondary={
                        <>
                            <Box {...informationProps}>
                                {prettyBytes(fileSize, {
                                    locale: "de",
                                })}
                            </Box>
                            {fileCreationDate && (
                                <Box {...informationProps}>
                                    <MdAdd />
                                    {fileCreationDate.format("lll")}
                                </Box>
                            )}
                            {fileSettings.uploadDate && (
                                <Box {...informationProps}>
                                    <MdFileUpload />
                                    {fileSettings.uploadDate.format("lll")}
                                </Box>
                            )}
                        </>
                    }
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
                            value={uploadDate}
                            format="MM.DD.YYYY HH:mm"
                            renderDay={(day, selectedDate, x, dayComponent) => {
                                if (
                                    // Date
                                    day && selectedDate && !day.isSame(selectedDate) && !day.isBefore(now) &&
                                    // Lesson
                                    lessonColor && lessonDateWeeks?.includes?.(day.day() - 1)
                                ) {
                                    return <Day color={lessonColor} dayComponent={dayComponent} />;
                                }

                                return dayComponent;
                            }}
                            InputProps={{
                                endAdornment: uploadDate !== null && (
                                    <IconButton
                                        edge="end"
                                        onClick={event => {
                                            event.stopPropagation();
                                            setUploadDate(null);
                                        }}
                                    >
                                        <MdClose />
                                    </IconButton>
                                ),
                            }}
                            onChange={date => date && setUploadDate(date)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <PrimaryButton disabled={uploadDate === fileSettings.uploadDate} onClick={saveChanges}>
                        {t("Änderungen speichern")}
                    </PrimaryButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SubmissionElement;
