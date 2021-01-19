import React, {forwardRef, useImperativeHandle, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {useQuery} from "react-query";
import {useDeviceWidth, useInheritedState, useQueryOptions} from "hooks";
import {IFetchTimetableData, IFetchTimetableResponse, useFetchLessonDetailAPI, useFetchTimetableAPI} from "hooks/apis";
import {findNextDate, getISODatetime, setBeginTime, setEndTime} from "utils";
import {AxiosError} from "axios";
import {useTranslation} from "react-i18next";
import {Box, Button, CircularProgress} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {LessonDetail} from "types";

import {LessonIcon} from "../../icons";
import {PrimaryButton} from "../../buttons";
import {SimpleDialog} from "../../components";

import Timetable, {ITimetable} from "./Timetable";

export interface ILessonField {
    value: string | null;
    onChange: (id: string | null) => any;

    allowNull?: boolean;
    initialDate?: Dayjs;
    minDate?: Dayjs;
    maxDate?: Dayjs;
    minTime?: Dayjs;
    maxTime?: Dayjs;
    allowedCourses?: string[];
    allowedLessons?: string[];
    allowedWeekdays?: number[];
    isError?: boolean;
}

export interface LessonFieldRef {
    lesson: LessonDetail;
    timetable: ITimetable;
}

const getStartDate = (targetedDate: Dayjs): Dayjs =>
    setBeginTime(
        findNextDate(
            targetedDate.subtract(4, "day"),
            1,
        ),
    );

const getEndDate = (targetedDate: Dayjs): Dayjs =>
    setEndTime(
        findNextDate(
            targetedDate,
            5,
        ),
    );

const LessonField = ({
    allowedCourses,
    allowedLessons,
    initialDate,
    maxDate,
    maxTime,
    minDate,
    minTime,
    onChange,
    value,
    allowNull,
    allowedWeekdays,
    isError: isFieldError,
}: ILessonField, ref) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchLesson = useFetchLessonDetailAPI();
    const fetchTimetable = useFetchTimetableAPI();
    const {isMD} = useDeviceWidth();

    const [activeDate, setActiveDate] = useState<Dayjs>(initialDate ?? dayjs());
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [lessonId, setLessonId] = useInheritedState<string | null>(value);

    const startDate = getStartDate(activeDate);
    const endDate = getEndDate(startDate);
    const timetableData = {
        startDatetime: getISODatetime(startDate),
        endDatetime: getISODatetime(endDate),
    };

    const {
        data: timetable,
        isLoading,
        isError,
        error,
    } = useQuery<IFetchTimetableResponse, AxiosError, IFetchTimetableData>(
        ["fetch_timetable", timetableData],
        () => fetchTimetable(timetableData),
        queryOptions,
    );
    const {
        data: lesson,
        isLoading: isLoadingLesson,
        isError: isErrorLesson,
    } = useQuery<LessonDetail | void, AxiosError, string>(
        [`fetch_lesson_${value}`, value],
        () => {
            if (typeof value === "string") {
                return fetchLesson(value);
            }
        },
        {
            ...queryOptions,
            enabled: Boolean(value),
        },
    );

    useImperativeHandle(ref, () => ({
        lesson,
        timetable,
    }));

    if ((!timetable && !isLoading) || (!lesson && Boolean(value) && !isLoadingLesson) || isError || isErrorLesson) {
        if (error) {
            return (
                <Alert severity="error">
                    {error.message}
                </Alert>
            );
        } else {
            return (
                <Alert severity="error">
                    {t("Der Stundenplan konnte nicht geladen werden")}
                </Alert>
            );
        }
    }

    return (
        <>
            <Button
                fullWidth
                startIcon={<LessonIcon />}
                endIcon={(isLoadingLesson || isLoading) && <CircularProgress color="inherit" size="1rem" />}
                variant="outlined"
                onClick={() => setIsOpened(true)}
            >
                {(() => {
                    if (isLoadingLesson || isLoading) {
                        return null;
                    } else if (lesson) {
                        return t("{{courseName}}: {{date}}", {
                            courseName: lesson.lessonData.course.name,
                            date: lesson.date.format("ll"),
                        });
                    } else {
                        return t("Stunde auswählen");
                    }
                })()}
            </Button>
            <SimpleDialog
                fullWidth
                fullScreen={!isMD}
                maxWidth="md"
                isOpen={isOpened}
                primaryButton={
                    <PrimaryButton
                        disabled={lessonId === value}
                        onClick={() => {
                            setIsOpened(false);
                            onChange(lessonId);
                        }}
                    >
                        {t("Bestätigen")}
                    </PrimaryButton>
                }
                title={t("Stunde aussuchen")}
                transition="slide"
                onClose={() => setIsOpened(false)}
            >
                {(isLoading || !timetable)
                    ? (
                        <Box display="flex" alignItems="center" justifyContent="center" height="100%" width="100%">
                            <CircularProgress />
                        </Box>
                    )
                    : (
                        <Timetable
                            timetable={timetable}
                            activeDate={activeDate}
                            minDate={minDate}
                            maxDate={maxDate}
                            minTime={minTime}
                            maxTime={maxTime}
                            allowedWeekdays={allowedWeekdays}
                            selectedLesson={lessonId}
                            allowedCourses={allowedCourses}
                            allowedLessons={allowedLessons}
                            onDateChange={setActiveDate}
                            onLessonSelect={newLessonId => {
                                if (newLessonId === lessonId) {
                                    // Set null
                                    if (allowNull) {
                                        setLessonId(null);
                                    }
                                } else {
                                    setLessonId(newLessonId);
                                }
                            }}
                        />
                    )
                }
            </SimpleDialog>
        </>
    );
};

export default forwardRef(LessonField);
