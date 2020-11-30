import React, {useCallback, useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {useFetchHomeworkDetailAPI,
    useQueryOptions,
    useUpdateHomeworkDataAPI,
    useUpdateHomeworkUserRelationAPI} from "hooks";
import {BooleanStatus, DetailPage, LoadingIndicator, LoadingOverlay, TextInput} from "components";
import {useTranslation} from "react-i18next";
import {BiBarChartSquare,
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
    MdLockOpen} from "react-icons/all";
import dayjs, {Dayjs} from "dayjs";
import {formatLesson} from "format";
import {HomeworkDetail} from "types";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import {Button, Link, Switch} from "@material-ui/core";
import camelcaseKeys from "camelcase-keys";
import {getISODatetime, getKeysByTrueValues} from "utils";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {generatePath} from "react-router";

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

const HomeworkPage = ({match: {params: {id}}}) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const updateHomeworkDataMutation = useUpdateHomeworkDataAPI();
    const updateHomeworkRelationMutation = useUpdateHomeworkUserRelationAPI();
    const fetchHomework = useFetchHomeworkDetailAPI();

    const [homework, setHomework] = useState<HomeworkDetail>();
    // Form
    const [information, setInformation] = useState<HomeworkDetail["information"]>("");
    const [dueDate, setDueDate] = useState<Dayjs>(dayjs());
    const [type, setType] = useState<HomeworkDetail["type"]>("");
    const [isPrivate, setIsPrivate] = useState<HomeworkDetail["isPrivate"]>(false);
    const [relation, setRelation] = useState<string[]>([]);

    const [forceEdit, setForceEdit] = useState<string[]>([]);

    // Server
    const [mutate, {isLoading: isUpdatingHomework, error: mutationError}] = useMutation(updateHomeworkDataMutation, {
        onSuccess: setHomework,
    });
    const [mutateRelation, {isLoading: isUpdatingRelation}] = useMutation(updateHomeworkRelationMutation, {
        onSuccess: newRelation => setRelation(getKeysByTrueValues(newRelation)),
    });
    const {isLoading, isError, updatedAt, refetch, isFetching} = useQuery(id, fetchHomework, {
        ...queryOptions,
        onSuccess: setHomework,
    });

    const updateHomework = useCallback(() => {
        if (homework) {
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
    const updateHomeworkRelation = useCallback((newRelation) => {
        if (homework) {
            mutateRelation({
                id: homework.id,
                completed: newRelation.includes("completed"),
                ignore: newRelation.includes("ignore"),
            });
        }
    }, [homework, mutateRelation]);

    // Update form
    const homeworkInformation = homework?.information;
    const homeworkDueDate = homework?.dueDate;
    const homeworkType = homework?.type;
    const homeworkIsPrivate = homework?.isPrivate;
    const homeworkRelation = homework?.userRelation;

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
        if (homeworkRelation) {
            setRelation(getKeysByTrueValues(homeworkRelation));
        }
    }, [homeworkDueDate, homeworkInformation, homeworkIsPrivate, homeworkRelation, homeworkType]);

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

    if (isError || !homework) {
        return null;
    }

    return (
        <DetailPage
            title={homework.lesson.lessonData.course.subject.name}
            color={homework.lesson.lessonData.course.subject.userRelation.color}
            defaultOrdering={[
                "information", "dueDate", "type", "isPrivate", "createdAt", "lesson",
            ]}
            refetch={refetch}
            updatedAt={dayjs(updatedAt)}
            isRefreshing={isFetching}
            errors={camelcaseKeys(
                mutationError?.response?.data ?? {
                },
            )}
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
                        <MuiPickersUtilsProvider utils={DayjsUtils}>
                            <KeyboardDatePicker
                                format="DD/MM/YYYY"
                                value={dueDate?.toDate()}
                                onChange={date => date && setDueDate(dayjs(date))}
                            />
                        </MuiPickersUtilsProvider>
                    ),
                    isUpdating: isUpdatingHomework && !homework.dueDate.isSame(dueDate),
                    onEditModeLeft: updateHomework,
                    disableShowMore: true,
                    reset: () => setDueDate(homework.dueDate),
                },
                type: {
                    icon: <BiBarChartSquare />,
                    title: t("Typ"),
                    information: homework.type,
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
                            href={generatePath("/lesson/:id/", {
                                id: homework.lesson.id,
                            })}
                        >
                            {t("Zur Stunde")}
                        </Link>
                    ),
                },
            }}
            orderingStorageName="detail:ordering:homework_detail"
            forceEdit={forceEdit}
            bottomNode={(
                <LoadingOverlay isLoading={isUpdatingRelation}>
                    <ToggleButtonGroup
                        value={relation}
                        size="large"
                        onChange={(event, newRelation) => {
                            setRelation(newRelation);
                            updateHomeworkRelation(newRelation);
                        }}
                    >
                        <ToggleButton value="completed">
                            <MdCheck />
                            {t("Erledigt")}
                        </ToggleButton>
                        <ToggleButton value="ignore">
                            <MdBlock />
                            {t("Ignorieren")}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </LoadingOverlay>
            )}
        />
    );
};

export default HomeworkPage;
