import React, {forwardRef, useImperativeHandle, useMemo, useState} from "react";
import {FieldProps} from "formik";
import {StudentLessonDetail, StudentTimetableDetail} from "types";
import {useFetchStudentCurrentTimetableAPI} from "hooks/apis";
import {useDeviceWidth, useInheritedState, useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {Box, Button, CircularProgress, FormGroup, FormHelperText, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import dayjs, {Dayjs} from "dayjs";
import {findNextDate, replaceDatetime} from "utils";

import {SimpleDialog} from "../../components";
import {PrimaryButton} from "../../buttons";
import {LessonIcon} from "../../icons";

import Timetable from "./Timetable";
import LessonFieldContext, {LessonIdentifier} from "./LessonFieldContext";


export interface ILessonField extends FieldProps {
    required?: boolean;
    disableNavigation?: boolean;

    allowedCourses?: string[];
    allowedLessons?: string[];
    allowedWeekdays?: number[];
    allowedMinTime?: Dayjs;
    allowedMaxTime?: Dayjs;
    allowedMinDate?: Dayjs;
    allowedMaxDate?: Dayjs;
    disablePast?: boolean;
    disableFuture?: boolean;

    onChange?: (event) => any;
    helpText?: string;
}

export interface LessonFieldReference {
    open: () => void;
    close: () => void;
    updateDate: (newDate: Date) => void;

    lesson?: StudentLessonDetail;
}

const isDateSelected = (lessonDate: Dayjs, selectedDate: Dayjs) =>
    replaceDatetime(lessonDate, "time").isSame(replaceDatetime(selectedDate, "time"));

const LessonField = ({
    field: {
        value,
        onChange,
        onBlur,
        name,
    },
    form,
    required,
    disableNavigation,

    allowedCourses,
    allowedLessons,
    allowedWeekdays,
    allowedMaxDate,
    allowedMaxTime,
    allowedMinDate,
    allowedMinTime,
    disablePast,
    disableFuture,

    helpText,
    onChange: customOnChange,
}: ILessonField, ref) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchTimetable = useFetchStudentCurrentTimetableAPI();
    const {isSM} = useDeviceWidth();
    const {id: lessonId, date: lessonDate} = value ?? {};

    const parentSelectedLessonValue = useMemo(() => (lessonId ? {
        id: lessonId,
        date: lessonDate,
    } : null), [lessonId, lessonDate]);
    const [selectedLessonIdentifier, setSelectedLessonIdentifier] = useInheritedState<LessonIdentifier | null>(parentSelectedLessonValue);
    const [date, setDate] = useState<Date>(() => findNextDate(dayjs(), 1).toDate());
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        data: timetable,
        isLoading,
    } = useQuery<StudentTimetableDetail, AxiosError>(
        "fetch_current_timetable",
        fetchTimetable,
        queryOptions,
    );

    const lesson = timetable?.lessons?.find?.(lesson => lesson.id === selectedLessonIdentifier?.id);
    const update = () => (customOnChange ?? onChange)({
        target: {
            name,
            lesson,
            value: selectedLessonIdentifier,
        },
    });

    useImperativeHandle(ref, () => ({
        lesson,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        updateDate: (newDate: Date) => setDate(newDate),
    }));

    const isError = form.touched[name] && form.errors[name];

    return (
        <>
            <FormGroup>
                <Button
                    size="large"
                    startIcon={<LessonIcon size="1rem" />}
                    variant="outlined"
                    onClick={() => setIsOpen(true)}
                >
                    {(() => {
                        if (lesson && lessonDate) {
                            return t("{{courseName}} ({{date}})", {
                                courseName: lesson.course.name,
                                date: lessonDate.format("ll"),
                            });
                        }

                        return t("Fach auswählen") + (required ? "*" : "");
                    })()}
                </Button>
                <FormHelperText error={Boolean(isError)}>
                    {isError ? form.errors[name] : helpText}
                </FormHelperText>
            </FormGroup>
            <LessonFieldContext.Provider
                value={{
                    allowedCourses,
                    allowedWeekdays,
                    allowedLessons,

                    allowedMinTime,
                    allowedMaxTime,
                    allowedMinDate: (() => {
                        if (allowedMinDate) {
                            return replaceDatetime(allowedMinDate, "time");
                        } else if (disablePast) {
                            return dayjs();
                        }

                        return undefined;
                    })(),
                    allowedMaxDate: (() => {
                        if (allowedMaxDate) {
                            return replaceDatetime(allowedMaxDate, "time");
                        } else if (disableFuture) {
                            return dayjs();
                        }

                        return undefined;
                    })(),

                    required: Boolean(required),
                    disableNavigation: Boolean(disableNavigation),
                    lessons: timetable?.lessons,
                    selectedLessonDate: selectedLessonIdentifier?.date,
                    selectedLessonId: selectedLessonIdentifier?.id,
                    activeDate: date,
                    onLessonSelect: setSelectedLessonIdentifier,
                    onActiveDateChange: setDate,
                }}
            >
                <SimpleDialog
                    fullScreen={!isSM}
                    PaperProps={{
                        style: {
                            width: "100%",
                        },
                    }}
                    maxWidth="sm"
                    transition="slide"
                    title={t("Fach auswählen")}
                    isOpen={isOpen}
                    primaryButton={
                        <PrimaryButton
                            disabled={Boolean(
                                (required && !selectedLessonIdentifier?.id) ||
                                ((selectedLessonIdentifier && lessonId === selectedLessonIdentifier.id) &&
                                    (selectedLessonIdentifier && lessonDate && isDateSelected(lessonDate, selectedLessonIdentifier.date))),
                            )}
                            onClick={() => {
                                update();
                                setIsOpen(false);
                            }}
                        >
                            {t("Auswählen")}
                        </PrimaryButton>
                    }
                    onClose={() => {
                        update();
                        onBlur({
                            target: {
                                name,
                            },
                        });
                        setIsOpen(false);
                    }}
                >
                    {isLoading ? (
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            height="100%"
                            width="100%"
                        >
                            <CircularProgress />
                            <Typography variant="h5">
                                {t("Stundenplan wird geladen...")}
                            </Typography>
                        </Box>
                    ) : <Timetable />}
                </SimpleDialog>
            </LessonFieldContext.Provider>
        </>
    );
};

export default forwardRef(LessonField);
