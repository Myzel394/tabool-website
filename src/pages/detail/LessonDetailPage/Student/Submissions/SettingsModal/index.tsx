import React from "react";
import {Box, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Typography} from "@material-ui/core";
import {DateTimePicker} from "@material-ui/pickers";
import {PrimaryButton} from "components";
import dayjs, {Dayjs} from "dayjs";
import {useTranslation} from "react-i18next";
import {useInheritedState} from "hooks";
import {StudentLessonDetail} from "types";
import {MdClear} from "react-icons/all";

import Day from "./Day";

export interface ISettingsDialog {
    publishDatetime: Dayjs | null;
    onPublishDatetimeChange: (newPublishDatetime: Dayjs | null) => any;
    isOpen: boolean;
    lesson: StudentLessonDetail;
    onClose: () => any;
}

const SettingsModal = ({
    isOpen,
    onPublishDatetimeChange,
    onClose,
    publishDatetime: parentPublishDatetime,
    lesson,
}: ISettingsDialog) => {
    const {t} = useTranslation();

    const [publishDatetime, setPublishDatetime] = useInheritedState<Dayjs | null>(parentPublishDatetime);

    const now = dayjs();
    const saveChanges = () => {
        onClose();
        onPublishDatetimeChange(publishDatetime);
    };
    const lessonColor = lesson.course.subject.userRelation.color;
    const lessonDateWeeks = lesson.course.weekdays;

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
                        value={publishDatetime}
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
                            endAdornment: (
                                <InputAdornment
                                    position="end" onClick={event => {
                                        event.stopPropagation();
                                        setPublishDatetime(null);
                                    }}
                                >
                                    <MdClear />
                                </InputAdornment>
                            ),
                        }}
                        onChange={date => date && setPublishDatetime(date)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <PrimaryButton
                    disabled={Boolean(publishDatetime && parentPublishDatetime && publishDatetime.isSame(parentPublishDatetime))}
                    onClick={saveChanges}
                >
                    {t("Änderungen speichern")}
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
};

export default SettingsModal;
