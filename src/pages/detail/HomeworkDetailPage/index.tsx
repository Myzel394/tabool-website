import React, {useContext, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {
    IUpdateHomeworkDataData,
    IUpdateHomeworkDataResponse,
    IUpdateHomeworkUserRelationData,
    IUpdateHomeworkUserRelationResponse,
    useFetchHomeworkDetailAPI,
    useUpdateHomeworkDataAPI,
    useUpdateHomeworkUserRelationAPI,
} from "hooks/apis";
import {BooleanStatus, DetailPage, HomeworkTypeField, LoadingIndicator, renderDayWithLessonWeekdays} from "components";
import {useTranslation} from "react-i18next";
import {
    BiBarChartSquare,
    FaClock,
    FaHourglassEnd,
    FaHourglassHalf,
    FaHourglassStart,
    FaRegHourglass,
    MdBlock,
    MdCheck,
    MdInfo,
    MdLock,
    MdLockOpen,
} from "react-icons/all";
import dayjs, {Dayjs} from "dayjs";
import {HomeworkDetail} from "types";
import {AxiosError} from "axios";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {ErrorContext} from "contexts";
import update from "immutability-helper";
import {useDetailPageError, useQueryOptions, useSnackbar} from "hooks";
import {CheckboxWithLabel, TextField} from "formik-material-ui";
import {Button, FormGroup, FormHelperText, Grid, Link} from "@material-ui/core";
import * as yup from "yup";
import {Field} from "formik";
import {formatLesson} from "format";
import {LessonIcon} from "components/icons";
import {buildPath, lazyDatetime} from "utils";
import {DateTimePicker} from "formik-material-ui-pickers";

import ExtraActions from "./ExtraActions";


type HomeworkKeys = "information" | "type" | "dueDate" | "createdAt" | "isPrivate" | "lesson";

const getDueDateIcon = (dueDate: Dayjs, ignore: boolean): JSX.Element => {
    // Ignore guard
    if (ignore) {
        return <FaRegHourglass />;
    }

    const today = dayjs();
    const diff = dueDate.diff(today, "day");

    if (diff < 0) {
        return <FaHourglassEnd />;
    } else if (diff > 7) {
        return <FaHourglassStart />;
    } else {
        return <FaHourglassHalf />;
    }
};

const HomeworkDetailPage = ({match: {params: {id}}}) => {
    const {t} = useTranslation();
    const schema = yup.object({
        information: yup.string().nullable(),
        type: yup.string().nullable(),
        isPrivate: yup.boolean(),
        dueDate: yup.date().min(dayjs(), t("Das Fälligkeitsdatum kann nicht in der Vergangenheit liegen.")).nullable(),
    });

    const queryOptions = useQueryOptions();
    const updateHomeworkDataMutation = useUpdateHomeworkDataAPI();
    const updateHomeworkRelationMutation = useUpdateHomeworkUserRelationAPI();
    const fetchHomework = useFetchHomeworkDetailAPI();
    const {onFetchError} = useDetailPageError();
    const {addError} = useSnackbar();
    const {dispatch: dispatchError} = useContext(ErrorContext);

    const [homework, setHomework] = useState<HomeworkDetail>();

    // Server
    const {
        mutateAsync,
    } = useMutation<IUpdateHomeworkDataResponse, AxiosError, IUpdateHomeworkDataData>(
        (values) => updateHomeworkDataMutation(id, values),
        {
            onSuccess: setHomework,
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );
    const {
        mutateAsync: mutateRelation,
    } = useMutation<IUpdateHomeworkUserRelationResponse, AxiosError, IUpdateHomeworkUserRelationData>(
        (values) => updateHomeworkRelationMutation(id, values),
        {
            onSuccess: newRelation => setHomework(prevState => update(prevState, {
                userRelation: {
                    $set: newRelation,
                },
            })),
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );
    const {
        isLoading,
        dataUpdatedAt,
        refetch,
        isFetching,
    } = useQuery<HomeworkDetail, AxiosError>(
        `fetch_homework_${id}`,
        () => fetchHomework(id),
        {
            ...queryOptions,
            onSuccess: setHomework,
            onError: (error) => onFetchError(error, Boolean(homework), t("Diese Hausaufgabe wurde nicht gefunden")),
        },
    );

    const canEditHomework = homework?.isPrivate;

    // Rendering
    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (!homework?.lesson) {
        dispatchError({
            type: "setError",
            payload: {},
        });
        return null;
    }

    const renderDueDateDay = renderDayWithLessonWeekdays(
        homework.lesson.lessonData.course.weekdays,
        homework.lesson.lessonData.course.subject.userRelation.color,
    );

    return (
        <DetailPage<HomeworkKeys, "completed" | "ignore", IUpdateHomeworkDataData, IUpdateHomeworkDataResponse>
            isRefreshing={isFetching}
            title={homework.lesson.lessonData.course.subject.name}
            validationSchema={schema}
            defaultOrdering={[
                "information", "dueDate", "type", "isPrivate", "createdAt", "lesson",
            ]}
            relationButtons={{
                values: {
                    completed: {
                        isActive: homework.userRelation.completed,
                        icon: <MdCheck />,
                        title: t("Erledigt"),
                    },
                    ignore: {
                        isActive: homework.userRelation.ignore,
                        icon: <MdBlock />,
                        title: t("Ignorieren"),
                    },
                },
                onSubmit: (data, {resetForm, setSubmitting}) =>
                    mutateRelation(data)
                        .then(relation => setHomework(prevState => update(prevState, {
                            userRelation: {
                                $set: relation,
                            },
                        })))
                        .catch(resetForm)
                        .finally(() => setSubmitting(false)),
            }}
            refetch={refetch}
            updatedAt={dayjs(dataUpdatedAt)}
            color={homework.lesson.lessonData.course.subject.userRelation.color}
            orderingStorageName="detail:ordering:homework"
            addPath={buildPath("/add/homework/", undefined, {
                lesson: homework.lesson.id,
                type: homework.type,
                dueDate: lazyDatetime(homework.dueDate),
                isPrivate: homework.isPrivate,
            })}
            renderTopField={reorderElement => (
                <>
                    <Grid item>
                        {reorderElement}
                    </Grid>
                    <Grid item>
                        <ExtraActions id={id} allow={Boolean(canEditHomework)} />
                    </Grid>
                </>
            )}
            data={{
                information: {
                    information: homework.information,
                    title: t("Information"),
                    icon: <MdInfo />,
                    renderField: canEditHomework && (({getFieldProps}) =>
                        <Field
                            {...getFieldProps("information")}
                            fullWidth
                            multiline
                            variant="outlined"
                            component={TextField}
                        />),
                },
                type: {
                    icon: <BiBarChartSquare />,
                    title: t("Typ"),
                    information: homework.type ?? "",
                    disableShowMore: true,
                    renderField: canEditHomework && (({getFieldProps}) =>
                        <Field
                            {...getFieldProps("type")}
                            type="text"
                            component={HomeworkTypeField}
                        />
                    ),
                },
                isPrivate: {
                    icon: homework.isPrivate ? <MdLock /> : <MdLockOpen />,
                    title: t("Privat"),
                    nativeValue: homework.isPrivate,
                    information: <BooleanStatus value={homework.isPrivate} />,
                    helperText: t("Hausaufgaben können nicht mehr privat gestellt werden, sobald sie einmal für den Kurs veröffentlicht wurden."),
                    disableShowMore: true,
                    renderField: canEditHomework && (({values, errors, setFieldValue, helperText, getFieldProps}) =>
                        <FormGroup>
                            <Field
                                {...getFieldProps("isPrivate")}
                                type="checkbox"
                                component={CheckboxWithLabel}
                                checked={values.isPrivate}
                                Label={{
                                    label: t("Privat für mich"),
                                }}
                                onChange={event => setFieldValue("isPrivate", event.target.checked)}
                            />
                            <FormHelperText error={Boolean(errors.isPrivate)}>
                                {errors.isPrivate ?? helperText}
                            </FormHelperText>
                        </FormGroup>),
                },
                dueDate: {
                    icon: (dueDate: Dayjs) =>
                        (dueDate ? getDueDateIcon(
                            dueDate,
                            Boolean(homework.dueDate && dueDate.isSame(homework.dueDate)) ||
                            !(homework.userRelation.ignore || homework.userRelation.completed),
                        ) : null),
                    title: t("Fälligkeitsdatum"),
                    nativeValue: homework.dueDate,
                    information: homework.dueDate?.format("LLL"),
                    isEqual: (oldValue: Dayjs, newValue: Dayjs) => oldValue?.isSame?.(newValue),
                    disableShowMore: true,
                    renderField: canEditHomework && (({getFieldProps}) =>
                        <Field
                            {...getFieldProps("dueDate")}
                            type="text"
                            component={DateTimePicker}
                            renderDay={renderDueDateDay}
                        />
                    ),
                },
                createdAt: {
                    icon: <FaClock />,
                    title: t("Einstellungsdatum"),
                    information: homework.createdAt.format("LLL"),
                    disableShowMore: true,
                },
                lesson: {
                    icon: <LessonIcon />,
                    title: t("Stunde"),
                    information: formatLesson(homework.lesson),
                    disableShowMore: true,
                    helperText: (
                        <Link
                            underline="none"
                            component={Button}
                            href={buildPath("/agenda/lesson/detail/:id/", {
                                id: homework.lesson.id,
                            })}
                        >
                            {t("Zur Stunde")}
                        </Link>
                    ),
                },
            }}
            onSubmit={(values, {setErrors, setSubmitting}) =>
                mutateAsync(values)
                    .then(setHomework)
                    .catch((error) => setErrors(error.response?.data))
                    .finally(() => setSubmitting(false))
            }
        />
    );
};

export default HomeworkDetailPage;
