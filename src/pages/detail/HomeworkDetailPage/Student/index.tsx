import React, {useState} from "react";
import {useMutation, useQuery} from "react-query";
import {
    IUpdateHomeworkUserRelationData,
    IUpdateHomeworkUserRelationResponse,
    IUpdateStudentHomeworkData,
    useFetchStudentHomeworkDetailAPI,
    useUpdateHomeworkUserRelationAPI,
    useUpdateStudentHomeworkAPI,
} from "hooks/apis";
import {
    BooleanStatus,
    DetailPage,
    ErrorPage,
    HomeworkTypeField,
    LoadingPage,
    renderDayWithLessonWeekdays,
    ResponseWrapper,
} from "components";
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
import {StudentHomeworkDetail} from "types";
import {AxiosError} from "axios";
import {PredefinedMessageType} from "hooks/useSnackbar";
import update from "immutability-helper";
import {useDetailPageError, useQueryOptions, useSnackbar} from "hooks";
import {TextField} from "formik-material-ui";
import {Button, Grid, Link, makeStyles} from "@material-ui/core";
import * as yup from "yup";
import {Field} from "formik";
import {LessonIcon} from "components/icons";
import {buildPath, lazyDatetime} from "utils";
import {DateTimePicker} from "formik-material-ui-pickers";
import {Alert} from "@material-ui/lab";
import {useParams} from "react-router";

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

const useClasses = makeStyles(theme => ({
    alert: {
        position: "sticky",
        left: 0,
        top: 0,
        zIndex: theme.zIndex.tooltip - 1,
    },
}));

const HomeworkDetailPage = () => {
    const {id} = useParams<{ id: string; }>();
    const {t} = useTranslation();
    const schema = yup.object({
        information: yup.string().max(1023).nullable(),
        type: yup.string().nullable(),
        isPrivate: yup.boolean(),
        dueDate: yup.date().min(new Date(), t("Das Fälligkeitsdatum kann nicht in der Vergangenheit liegen.")),
    });

    const queryOptions = useQueryOptions();
    const updateHomeworkDataMutation = useUpdateStudentHomeworkAPI();
    const updateHomeworkRelationMutation = useUpdateHomeworkUserRelationAPI();
    const fetchHomework = useFetchStudentHomeworkDetailAPI();
    const {onFetchError} = useDetailPageError();
    const {addError} = useSnackbar();
    const classes = useClasses();

    const [homework, setHomework] = useState<StudentHomeworkDetail>();

    // Server
    const {
        mutateAsync,
    } = useMutation<StudentHomeworkDetail, AxiosError, IUpdateStudentHomeworkData>(
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
        error,
    } = useQuery<StudentHomeworkDetail, AxiosError>(
        ["fetch_homework", id],
        () => fetchHomework(id),
        {
            ...queryOptions,
            onSuccess: setHomework,
            onError: (error) => onFetchError(error, Boolean(homework), t("Diese Hausaufgabe wurde nicht gefunden")),
        },
    );

    return (
        <ResponseWrapper<StudentHomeworkDetail>
            isLoading={isLoading}
            renderLoading={() => <LoadingPage title={t("Hausaufgabe wird geladen...")} />}
            renderError={error =>
                <ErrorPage
                    status={error?.response?.status}
                    notFound={t("Diese Hausaufgabe wurde nicht gefunden.")}
                />
            }
            data={homework}
            error={error}
            getDocumentTitle={homework => t("Hausaufgabe in {{course}} bis zum {{dueDate}}", {
                course: homework.lesson.course.name,
                dueDate: homework.dueDate.format("LL"),
            })}
        >
            {homework => {
                const canEditHomework = homework?.isPrivate;

                const renderDueDateDay = renderDayWithLessonWeekdays(
                    homework.lesson.course.weekdays,
                    homework.lesson.course.subject.userRelation.color,
                );

                return (
                    <>
                        {canEditHomework && (
                            <div className={classes.alert}>
                                <Alert severity="info">
                                    {t("Dies ist eine private Hausaufgabe für dich, daher kannst du sie bearbeiten.")}
                                </Alert>
                            </div>
                        )}
                        <DetailPage<HomeworkKeys, "completed" | "ignored", IUpdateStudentHomeworkData, StudentHomeworkDetail>
                            isRefreshing={isFetching}
                            title={homework.lesson.course.subject.name}
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
                                    ignored: {
                                        isActive: homework.userRelation.ignored,
                                        icon: <MdBlock />,
                                        title: t("Ignorieren"),
                                    },
                                },
                                onSubmit: (data, {resetForm, setSubmitting}) =>
                                    mutateRelation(data)
                                        .catch(resetForm)
                                        .finally(() => setSubmitting(false)),
                            }}
                            updatedAt={dayjs(dataUpdatedAt)}
                            color={homework.lesson.course.subject.userRelation.color}
                            orderingStorageName="homework"
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
                                    disableShowMore: true,
                                },
                                dueDate: {
                                    icon: (dueDate: Dayjs) =>
                                        (dueDate ? getDueDateIcon(
                                            dueDate,
                                            Boolean(homework.dueDate && dueDate.isSame(homework.dueDate)) ||
                                            !(homework.userRelation.ignored || homework.userRelation.completed),
                                        ) : null),
                                    title: t("Fälligkeitsdatum"),
                                    nativeValue: homework.dueDate,
                                    information: homework.dueDate?.format("LLL"),
                                    isEqual: (oldValue: Dayjs, newValue: Dayjs) => oldValue?.isSame?.(newValue),
                                    disableShowMore: true,
                                    renderField: canEditHomework && (({getFieldProps, setFieldValue}) =>
                                        <Field
                                            {...getFieldProps("dueDate")}
                                            disablePast
                                            component={DateTimePicker}
                                            renderDay={renderDueDateDay}
                                            inputVariant="outlined"
                                            ampm={false}
                                            onChange={date => setFieldValue("dueDate", date)}
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
                                    information: `${homework.lesson.course.name}: ${homework.lessonDate.format("LL")}`,
                                    disableShowMore: true,
                                    helperText: (
                                        <Link
                                            underline="none"
                                            component={Button}
                                            href={buildPath("/agenda/lesson/detail/:id/:date/", {
                                                id: homework.lesson.id,
                                                date: lazyDatetime(homework.lessonDate, "date") ?? "",
                                            })}
                                        >
                                            {t("Zur Stunde")}
                                        </Link>
                                    ),
                                },
                            }}
                            onRefetch={refetch}
                            onSubmit={(values, {setErrors, setSubmitting}) =>
                                mutateAsync(values)
                                    .then(setHomework)
                                    .catch((error) => setErrors(error.response?.data))
                                    .finally(() => setSubmitting(false))
                            }
                        />
                    </>
                );
            }}
        </ResponseWrapper>
    );
};

export default HomeworkDetailPage;
