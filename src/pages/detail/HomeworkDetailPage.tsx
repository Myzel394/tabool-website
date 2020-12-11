import React, {useCallback, useContext, useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {
    IUpdateHomeworkUserRelationData,
    IUpdateHomeworkUserRelationResponse,
    useDetailPageError,
    useFetchHomeworkDetailAPI,
    useQueryOptions,
    useSnackbar,
    useUpdateHomeworkDataAPI,
    useUpdateHomeworkUserRelationAPI,
} from "hooks";
import {BooleanStatus, DatePicker, DetailPage, LoadingIndicator, TextInput} from "components";
import {useTranslation} from "react-i18next";
import {
    BiBarChartSquare,
    FaClock,
    FaHourglassEnd,
    FaHourglassHalf,
    FaHourglassStart,
    FaInfoCircle,
    FaRegHourglass,
    FaTable,
    MdBlock,
    MdCheck,
    MdLock,
    MdLockOpen,
} from "react-icons/all";
import dayjs, {Dayjs} from "dayjs";
import {formatLesson} from "format";
import {HomeworkDetail} from "types";
import {Button, Link, Switch} from "@material-ui/core";
import camelcaseKeys from "camelcase-keys";
import {getISODatetime} from "utils";
import {generatePath} from "react-router";
import {AxiosError} from "axios";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {IUpdateHomeworkDataData, IUpdateHomeworkDataResponse} from "hooks/apis/send/update/useUpdateHomeworkDataAPI";
import {ErrorContext} from "contexts";
import update from "immutability-helper";

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
    const [
        mutate,
        {
            isLoading: isUpdatingHomework,
            error: mutationError,
        },
    ] = useMutation<IUpdateHomeworkDataResponse, AxiosError, IUpdateHomeworkDataData>(
        updateHomeworkDataMutation,
        {
            onSuccess: setHomework,
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );
    const [
        mutateRelation,
        {
            isLoading: isUpdatingRelation,
        },
    ] = useMutation<IUpdateHomeworkUserRelationResponse, AxiosError, IUpdateHomeworkUserRelationData>(
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
        updatedAt,
        refetch,
        isFetching,
    } = useQuery<HomeworkDetail, AxiosError>(
        id,
        fetchHomework,
        {
            ...queryOptions,
            onSuccess: setHomework,
            onError: (error) => onFetchError(error, Boolean(homework)),
        },
    );

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

    if (!homework) {
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
            updatedAt={dayjs(updatedAt)}
            isRefreshing={isFetching}
            orderingStorageName="detail:ordering:homework"
            forceEdit={forceEdit}
            searchAllPath={generatePath("/homework/")}
            addPath={generatePath("/homework/add/")}
            errors={camelcaseKeys(
                mutationError?.response?.data ?? {},
            )}
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
                    icon: <FaInfoCircle />,
                    title: t("Information"),
                    information: homework.information,
                    input: (
                        <TextInput
                            multiline
                            value={information}
                            onChange={event => setInformation(event.target.value)}
                        />
                    ),
                    isUpdating: isUpdatingHomework && homework.information !== information,
                    onEditModeLeft: updateHomework,
                    reset: () => setInformation(homework.information),
                },
                dueDate: {
                    icon: getDueDateIcon(
                        dueDate,
                        dueDate.isSame(homework.dueDate) ||
                        !(homework.userRelation.ignore || homework.userRelation.completed),
                    ),
                    title: t("Fälligkeitsdatum"),
                    information: homework.dueDate.format("L"),
                    input: (
                        <DatePicker
                            value={dueDate?.toDate()}
                            onChange={date => date && setDueDate(dayjs(date))}
                        />
                    ),
                    isUpdating: isUpdatingHomework && !homework.dueDate.isSame(dueDate),
                    onEditModeLeft: updateHomework,
                    disableShowMore: true,
                    reset: () => setDueDate(homework.dueDate),
                },
                type: {
                    icon: <BiBarChartSquare />,
                    title: t("Typ"),
                    information: homework?.type ?? "",
                    input: (
                        <TextInput
                            value={type}
                            onChange={event => setType(event.target.value)}
                        />
                    ),
                    isUpdating: isUpdatingHomework && homework.type !== type,
                    onEditModeLeft: updateHomework,
                    disableShowMore: true,
                    reset: () => setType(homework.type),
                },
                isPrivate: {
                    icon: homework.isPrivate ? <MdLock /> : <MdLockOpen />,
                    title: t("Privat"),
                    information: <BooleanStatus value={homework.isPrivate} />,
                    input: (
                        <Switch
                            value={isPrivate}
                            disabled={!homework.isPrivate}
                            onChange={event => setIsPrivate(event.target.checked)}
                        />
                    ),
                    onEditModeLeft: updateHomework,
                    isUpdating: isUpdatingHomework && homework.isPrivate !== isPrivate,
                    helpText: t("Hausaufgaben können nicht mehr privat gestellt werden, sobald sie einmal für den Kurs veröffentlicht wurden."),
                    reset: () => setIsPrivate(homework.isPrivate),
                },
                createdAt: {
                    icon: <FaClock />,
                    title: t("Einstellungsdatum"),
                    information: homework.createdAt.format("LT"),
                    disableShowMore: true,
                },
                lesson: {
                    icon: <FaTable />,
                    title: t("Stunde"),
                    information: formatLesson(homework.lesson),
                    disableShowMore: true,
                    subInformation: (
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
