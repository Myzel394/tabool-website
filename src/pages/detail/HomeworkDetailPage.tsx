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
import {BooleanStatus, DetailPage, LessonIcon, LoadingIndicator} from "components";
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
import {generatePath} from "react-router";
import {AxiosError} from "axios";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {ErrorContext} from "contexts";
import update from "immutability-helper";
import {useDetailPageError, useQueryOptions, useSnackbar} from "hooks";
import {Switch, TextField} from "formik-material-ui";
import {DateTimePicker} from "formik-material-ui-pickers";
import {Button, Link} from "@material-ui/core";
import {formatLesson} from "format";
import * as yup from "yup";


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

const schema = yup.object({
    information: yup.string().nullable(),
    type: yup.string().nullable(),
    isPrivate: yup.boolean(),
    dueDate: yup.date().nullable(),
});

const HomeworkDetailPage = ({match: {params: {id}}}) => {
    const {t} = useTranslation();
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
        updateHomeworkDataMutation,
        {
            onSuccess: setHomework,
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );
    const {
        mutateAsync: mutateRelation,
    } = useMutation<IUpdateHomeworkUserRelationResponse, AxiosError, IUpdateHomeworkUserRelationData>(
        updateHomeworkRelationMutation,
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
            onError: (error) => onFetchError(error, Boolean(homework)),
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

    return (
        <DetailPage<HomeworkKeys, IUpdateHomeworkDataData, IUpdateHomeworkDataResponse, "completed" | "ignore">
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
                onSubmit: (data, {resetForm}) =>
                    mutateRelation({
                        id: homework.id,
                        ...data,
                    })
                        .catch(error => {
                            addError(error, undefined, PredefinedMessageType.ErrorMutating);
                            resetForm();
                        }),
            }}
            refetch={refetch}
            updatedAt={dayjs(dataUpdatedAt)}
            color={homework.lesson.lessonData.course.subject.userRelation.color}
            orderingStorageName="detail:ordering:homework"
            searchAllPath={generatePath("/homework/")}
            addPath={generatePath("/homework/add/")}
            data={{
                information: {
                    information: homework.information,
                    title: t("Information"),
                    icon: <MdInfo />,
                    fieldProps: canEditHomework && {
                        fullWidth: true,
                        multiline: true,
                        type: "text",
                        component: TextField,
                        variant: "outlined",
                    },
                },
                type: {
                    icon: <BiBarChartSquare />,
                    title: t("Typ"),
                    information: homework.type ?? "",
                    disableShowMore: true,
                    fieldProps: canEditHomework && {
                        fullWidth: true,
                        type: "text",
                        component: TextField,
                        variant: "outlined",
                    },
                },
                isPrivate: {
                    icon: homework.isPrivate ? <MdLock /> : <MdLockOpen />,
                    title: t("Privat"),
                    nativeValue: homework.isPrivate,
                    information: <BooleanStatus value={homework.isPrivate} />,
                    helperText: t("Hausaufgaben können nicht mehr privat gestellt werden, sobald sie einmal für den Kurs veröffentlicht wurden."),
                    disableShowMore: true,
                    fieldProps: canEditHomework && {
                        type: "checkbox",
                        component: Switch,
                    },
                },
                dueDate: {
                    icon: getDueDateIcon(
                        homework.dueDate,
                        !(homework.userRelation.ignore || homework.userRelation.completed),
                    ),
                    title: t("Fälligkeitsdatum"),
                    nativeValue: homework.dueDate,
                    information: homework.dueDate.format("LL"),
                    isEqual: (oldValue: Dayjs, newValue: Dayjs) => oldValue.isSame(newValue),
                    disableShowMore: true,
                    fieldProps: canEditHomework && {
                        type: "text",
                        component: DateTimePicker,
                        format: "ll",
                        inputVariant: "outlined",
                    },
                },
                createdAt: {
                    icon: <FaClock />,
                    title: t("Einstellungsdatum"),
                    information: homework.createdAt.format("LT"),
                    disableShowMore: true,
                },
                lesson: {
                    icon: <LessonIcon />,
                    title: t("Stunde"),
                    information: formatLesson(homework.lesson),
                    disableShowMore: true,
                    helperText: (
                        <Link
                            component={Button}
                            href={generatePath("/lesson/detail/:id/", {
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
                    .catch((error) => setErrors(error.response?.data))
                    .finally(() => setSubmitting(false))
            }
        />
    );
};

export default HomeworkDetailPage;
