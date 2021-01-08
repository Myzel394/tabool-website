import React, {useContext, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {IUpdateExamData, IUpdateExamResponse, useFetchExamDetailAPI, useUpdateExamAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {useColors, useQueryOptions, useSnackbar} from "hooks";
import {ExamDetail} from "types";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {CourseIcon, DetailPage, LoadingIndicator, PlaceField, renderDayWithLessonWeekdays, RoomIcon} from "components";
import {ErrorContext} from "contexts";
import {formatRoom} from "format";
import {useTranslation} from "react-i18next";
import {FaCalendarDay, MdInfo, MdToday} from "react-icons/all";
import {Field} from "formik";
import dayjs, {Dayjs} from "dayjs";
import {TextField} from "formik-material-ui";
import {buildPath, replaceDatetime} from "utils";
import * as yup from "yup";
import {DatePicker} from "formik-material-ui-pickers";
import {InputAdornment} from "@material-ui/core";

type ExamKeys = "course" | "place" | "information" | "targetedDate";

const ExamDetailPage = ({match: {params: {id}}}) => {
    const {t} = useTranslation();
    const {
        inputIconColor,
    } = useColors();
    const updateExam = useUpdateExamAPI();
    const fetchExam = useFetchExamDetailAPI();
    const queryOptions = useQueryOptions();
    const {addError} = useSnackbar();
    const {dispatch: dispatchError} = useContext(ErrorContext);

    const [exam, setExam] = useState<ExamDetail>();

    const {
        isLoading,
        isFetching,
        refetch,
        dataUpdatedAt,
    } = useQuery<ExamDetail, AxiosError, string>(
        ["fetch_exam", id],
        () => fetchExam(id),
        {
            ...queryOptions,
            onSuccess: setExam,
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorLoading),
        },
    );
    const {
        mutateAsync,
    } = useMutation<IUpdateExamResponse, AxiosError, IUpdateExamData>(
        (values) => updateExam(id, values),
        {
            onSuccess: setExam,
        },
    );

    const validationSchema = yup.object({
        course: yup.string().required(t("Dieses Feld wird benötigt.")),
        place: yup.string().nullable(),
        targetedDate: yup.date().typeError(t("Dieses Feld wird benötigt.")).required(t("Dieses Feld wird benötigt.")),
        information: yup.string().nullable(),
    });

    // Rendering
    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (!exam) {
        dispatchError({
            type: "setError",
            payload: {},
        });
        return null;
    }

    const renderTargetedDateDay = renderDayWithLessonWeekdays(exam.course.weekdays, exam.course.subject.userRelation.color);

    return (
        <DetailPage<ExamKeys, "", ExamDetail>
            color={exam.course.subject.userRelation.color}
            orderingStorageName="detail:ordering:exam"
            refetch={refetch}
            defaultOrdering={[
                "targetedDate", "information", "place", "course",
            ]}
            validationSchema={validationSchema}
            isRefreshing={isFetching}
            addPath={buildPath("/add/exam/", undefined, {
                place: exam.room?.id,
                course: exam.course.id,
            })}
            updatedAt={dayjs(dataUpdatedAt)}
            data={{
                course: {
                    disableShowMore: true,
                    information: exam.course.name,
                    title: t("Kurs"),
                    icon: <CourseIcon />,
                },
                place: {
                    disableShowMore: true,
                    information: exam.room ? formatRoom(exam.room) : "-",
                    nativeValue: exam.room?.id,
                    icon: <RoomIcon />,
                    title: t("Ort"),
                    renderField({getFieldProps}) {
                        return (
                            <Field
                                {...getFieldProps("place")}
                                type="text"
                                component={PlaceField}
                            />
                        );
                    },
                },
                information: {
                    information: exam.information ?? "",
                    nativeValue: exam.information,
                    icon: <MdInfo />,
                    title: t("Informationen"),
                    renderField({getFieldProps}) {
                        return (
                            <Field
                                {...getFieldProps("information")}
                                fullWidth
                                multiline
                                type="text"
                                component={TextField}
                                variant="outlined"
                            />
                        );
                    },
                },
                targetedDate: {
                    isEqual: (oldValue: Dayjs, newValue: Dayjs) => replaceDatetime(oldValue, "time").isSame(replaceDatetime(newValue, "time")),
                    information: exam.targetedDate.format("LL"),
                    nativeValue: exam.targetedDate,
                    icon: <FaCalendarDay />,
                    title: t("Datum"),
                    helperText: t("Datum, wann die Arbeit geschrieben wird"),
                    renderField({getFieldProps, setFieldValue}) {
                        return (
                            <Field
                                {...getFieldProps("targetedDate")}
                                fullWidth
                                type="text"
                                component={DatePicker}
                                renderDay={renderTargetedDateDay}
                                format="ll"
                                inputVariant="outlined"
                                InputProps={{
                                    startAdornment:
                                        <InputAdornment position="start">
                                            <MdToday color={inputIconColor} />
                                        </InputAdornment>,
                                }}
                                onChange={date => setFieldValue("targetedDate", date)}
                            />
                        );
                    },
                },
            }}
            title={t("{{subject}}-Arbeit", {
                subject: exam.course.subject.name,
            })}
            subTitle={t("am {{date}}", {
                date: exam.targetedDate.format("LL"),
            })}
            onSubmit={(values, {setSubmitting, setErrors}) =>
                mutateAsync({
                    targetedDate: values.targetedDate,
                    information: values.information,
                    roomId: values.place,
                })
                    .catch(error => setErrors(error.response?.data))
                    .finally(() => setSubmitting(false))
            }
        />
    );
};

export default ExamDetailPage;
