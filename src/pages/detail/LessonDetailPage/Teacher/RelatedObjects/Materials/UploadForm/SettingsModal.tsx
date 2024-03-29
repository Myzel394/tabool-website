import React, {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {PrimaryButton, SimpleDialog} from "components";
import {MdCheck, MdInfo} from "react-icons/all";
import {useInheritedState} from "hooks";
import {useTranslation} from "react-i18next";
import {DateTimePicker} from "@material-ui/pickers";
import {Checkbox, FormControlLabel, IconButton} from "@material-ui/core";

import Day from "../../../../Day";
import {AnnounceExplanation} from "../../../../../../../modules";


export interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => any;

    publishDatetime: Dayjs;
    announce: boolean;

    onChange: (newValues: {
        publishDatetime: Dayjs;
        announce: boolean;
    }) => any;

    lessonColor: string;
    lessonDateWeeks: number[];
}

const SettingsModal = ({
    isOpen,
    onClose,
    onChange,
    lessonColor,
    lessonDateWeeks,
    announce: parentAnnounce,
    publishDatetime: parentPublishDatetime,
}: SettingsModalProps) => {
    const {t} = useTranslation();

    const [isAnnounceOpen, setIsAnnounceOpen] = useState<boolean>(false);
    const [announce, setAnnounce] = useInheritedState<boolean>(parentAnnounce);
    const [publishDatetime, setPublishDatetime] = useInheritedState<Dayjs>(parentPublishDatetime);

    return (
        <>
            <SimpleDialog
                title={t("Veröffentlichung einstellen")}
                primaryButton={
                    <PrimaryButton
                        startIcon={<MdCheck />}
                        onClick={() => {
                            onClose();
                            onChange({
                                announce,
                                publishDatetime,
                            });
                        }}
                    >
                        {t("Speichern")}
                    </PrimaryButton>
                }
                isOpen={isOpen}
                onClose={onClose}
            >
                <DateTimePicker
                    disablePast
                    inputVariant="outlined"
                    value={publishDatetime}
                    format="lll"
                    renderDay={(day, selectedDate, x, dayComponent) => {
                        if (
                        // Date
                            day && selectedDate && !day.isSame(selectedDate) && !day.isBefore(dayjs()) &&
                        // Lesson
                        lessonColor && lessonDateWeeks?.includes?.(day.day())
                        ) {
                            return <Day color={lessonColor} dayComponent={dayComponent} />;
                        }

                        return dayComponent;
                    }}
                    onChange={date => date && setPublishDatetime(date)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={announce}
                            onChange={event => setAnnounce(event.target.checked)}
                        />
                    }
                    label={
                        <>
                            {t("Ankündigen")}
                            <IconButton
                                size="small"
                                edge="end"
                                onClick={() => setIsAnnounceOpen(true)}
                            >
                                <MdInfo />
                            </IconButton>
                        </>
                    }
                />
            </SimpleDialog>
            <AnnounceExplanation
                isOpen={isAnnounceOpen}
                onClose={() => setIsAnnounceOpen(false)}
            />
        </>
    );
};

export default SettingsModal;
