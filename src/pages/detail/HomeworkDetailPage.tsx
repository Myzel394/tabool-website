import React, {useCallback, useContext, useEffect, useState} from "react";
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
import {getISODatetime} from "utils";
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
    const queryOptions = useQueryOptions();
    const updateHomeworkDataMutation = useUpdateHomeworkDataAPI();
    const updateHomeworkRelationMutation = useUpdateHomeworkUserRelationAPI();
    const fetchHomework = useFetchHomeworkDetailAPI();
    const {onFetchError} = useDetailPageError();
    const {addError} = useSnackbar();
    const {dispatch: dispatchError} = useContext(ErrorContext);

    const [homework, setHomework] = useState<HomeworkDetail>();
    // Form
    const [information, setInformation] = useState<HomeworkDetail["information"]>("");
    const [dueDate, setDueDate] = useState<Dayjs>(dayjs());
    const [type, setType] = useState<HomeworkDetail["type"]>(null);
    const [isPrivate, setIsPrivate] = useState<HomeworkDetail["isPrivate"]>(false);

    const [forceEdit, setForceEdit] = useState<HomeworkKeys[]>([]);

    // Server
    const {
        mutate,
        isLoading: isUpdatingHomework,
        error: mutationError,
    } = useMutation<IUpdateHomeworkDataResponse, AxiosError, IUpdateHomeworkDataData>(
        updateHomeworkDataMutation,
        {
            onSuccess: setHomework,
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );
    const {
        mutate: mutateRelation,
        isLoading: isUpdatingRelation,
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

    const updateHomework = useCallback(() => {
        // Update if
        if (
            // homework is defined
            homework &&
            (
                // and form changed
                (
                    information !== homework.information ||
                    dueDate !== homework.dueDate ||
                    type !== homework.type ||
                    isPrivate !== homework.isPrivate
                )
            )
        ) {
            if (forceEdit.length === 0) {
                mutate({
                    id: homework.id,
                    information: information ? information : undefined,
                    dueDate: dueDate ? getISODatetime(dueDate) : undefined,
                    type: type ? type : undefined,
                    isPrivate: isPrivate ? isPrivate : undefined,
                });
            }
        }
    }, [dueDate, forceEdit.length, homework, information, isPrivate, mutate, type]);

    // Update form from server
    const homeworkInformation = homework?.information;
    const homeworkDueDate = homework?.dueDate;
    const homeworkType = homework?.type;
    const homeworkIsPrivate = homework?.isPrivate;
    useEffect(() => {
        if (homeworkInformation) {
            setInformation(homeworkInformation);
        }
        if (homeworkDueDate) {
            setDueDate(homeworkDueDate);
        }
        if (homeworkType) {
            setType(homeworkType);
        }
        if (homeworkIsPrivate) {
            setIsPrivate(homeworkIsPrivate);
        }
    }, [homeworkDueDate, homeworkInformation, homeworkIsPrivate, homeworkType]);

    // Form validation
    useEffect(() => {
        setForceEdit([]);
        if (!dueDate.isValid()) {
            setForceEdit(prevState => [...prevState, "dueDate"]);
        }
    }, [dueDate]);

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
        <DetailPage<HomeworkKeys, any, "completed" | "ignore">
            title={homework.lesson.lessonData.course.subject.name}
            color={homework.lesson.lessonData.course.subject.userRelation.color}
            defaultOrdering={[
                "information", "dueDate", "type", "isPrivate", "createdAt", "lesson",
            ]}
            refetch={refetch}
            updatedAt={dayjs(dataUpdatedAt)}
            isRefreshing={isFetching}
            orderingStorageName="detail:ordering:homework"
            searchAllPath={generatePath("/homework/")}
            addPath={generatePath("/homework/add/")}
            relation={{
                buttons: [
                    {
                        value: "completed" as "completed",
                        icon: <MdCheck />,
                        title: t("Erledigt"),
                    },
                    {
                        value: "ignore" as "ignore",
                        icon: <MdBlock />,
                        title: t("Ignorieren"),
                    },
                ],
                isUpdating: isUpdatingRelation,
                value: homework.userRelation,
                onChange: (newRelation) =>
                    mutateRelation({
                        id: homework.id,
                        completed: newRelation.completed,
                        ignore: newRelation.ignore,
                    }),
            }}
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
                        dueDate,
                        dueDate.isSame(homework.dueDate) ||
                        !(homework.userRelation.ignore || homework.userRelation.completed),
                    ),
                    title: t("Fälligkeitsdatum"),
                    nativeValue: homework.dueDate,
                    information: homework.dueDate.format("LL"),
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
        />
    );
};

export default HomeworkDetailPage;
