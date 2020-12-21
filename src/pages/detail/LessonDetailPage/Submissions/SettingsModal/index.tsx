import React, {useContext} from "react";
import {Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography} from "@material-ui/core";
import {DateTimePicker} from "@material-ui/pickers";
import {MdClose} from "react-icons/md";
import {PrimaryButton} from "components";
import dayjs, {Dayjs} from "dayjs";
import {useTranslation} from "react-i18next";
import update from "immutability-helper";
import {useInheritedState} from "hooks";

import LessonContext from "../../LessonContext";

import Day from "./Day";

export interface Settings {
    uploadDate: Dayjs | null;
}

export interface ISettingsDialog {
    value: Settings;
    onChange: (newSettings: Settings) => any;
    isOpen: boolean;
    onClose: () => any;
}

const SettingsModal = ({
    isOpen,
    onChange,
    onClose,
    value,
}: ISettingsDialog) => {
    const {t} = useTranslation();
    const {lesson} = useContext(LessonContext);

    const [uploadDate, setUploadDate] = useInheritedState<Dayjs | null>(value.uploadDate);

    const now = dayjs();
    const saveChanges = () => {
        onClose();
        onChange(update(value, {
            uploadDate: {
                $set: uploadDate,
            },
        }));
    };
    const lessonColor = lesson.lessonData.course.subject.userRelation.color;
    const lessonDateWeeks = lesson.lessonData.weekdays;

    return (
        <Dialog open={isOpen} onBackdropClick={onClose}>
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
                        format="lll"
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
                            endAdornment: value.uploadDate !== null && (
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
                <PrimaryButton disabled={uploadDate === value.uploadDate} onClick={saveChanges}>
                    {t("Änderungen speichern")}
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
};

export default SettingsModal;
