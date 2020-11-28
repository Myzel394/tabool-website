import React, {useCallback, useMemo, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {useFetchHomeworkDetailAPI, useQueryOptions, useUpdateHomeworkDataAPI} from "hooks";
import {DetailPage, LoadingIndicator, TextInput} from "components";
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
} from "react-icons/all";
import dayjs, {Dayjs} from "dayjs";
import update from "immutability-helper";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import {formatLesson} from "format";
import {EditableHomeworkData, HomeworkDetail} from "types";
import {getISODate} from "utils";

const getDueDateIcon = (dueDate: Dayjs, ignore: boolean): JSX.Element => {
    // Ignore guard
    if (ignore) {
        return <FaRegHourglass />;
    }

    const today = dayjs();
    const diff = today.diff(dueDate, "day");

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
    const updateHomeworkData = useUpdateHomeworkDataAPI();
    const fetchHomework = useFetchHomeworkDetailAPI();
    const [homework, _setHomework] = useState<HomeworkDetail>();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [tempHomework, _setTempHomework] = useState<EditableHomeworkData>({});
    const [errors, setErrors] = useState<any>({});
    const setHomework = (value: HomeworkDetail) => {
        _setHomework(value);
        _setTempHomework(update(tempHomework, {
            dueDate: {
                $set: value.dueDate,
            },
            isPrivate: {
                $set: value.isPrivate,
            },
            information: {
                $set: value.information,
            },
            type: {
                $set: value.type,
            },
        }));
    };
    const validateHomework = useCallback((data: EditableHomeworkData): boolean => {
        let isSuccess = true;
        setErrors({});

        if (!data?.dueDate?.isValid()) {
            isSuccess = false;
            setErrors(prevState =>
                update(prevState, {
                    dueDate: {
                        $set: t("Ungültiges Datum"),
                    },
                }));
        }

        return isSuccess;
    }, [t]);
    const setTempHomework = useCallback((value: EditableHomeworkData) => {
        if (validateHomework(tempHomework)) {
            _setTempHomework(value);
        }
    }, [tempHomework, validateHomework]);
    const {isLoading, isError, updatedAt, refetch, isFetching} = useQuery(id, fetchHomework, {
        ...queryOptions,
        onSuccess: setHomework,
    });
    const [mutate] = useMutation(updateHomeworkData, {
        onSuccess: data => setHomework(data),
    });
    const sendToServer = useCallback((editedData: EditableHomeworkData, baseData: HomeworkDetail) => {
        const {information, isPrivate, type, dueDate} = editedData;

        mutate({
            id: baseData.id,
            information: information === baseData.information ? undefined : information,
            isPrivate: isPrivate === baseData.isPrivate ? undefined : isPrivate,
            type: type === baseData.type ? undefined : type,
            dueDate: dueDate.isSame(baseData?.dueDate) ? undefined : getISODate(dueDate),
        });
    }, [mutate]);
    const sendToServerFn = useCallback(
        () => {
            if (homework) {
                sendToServer(tempHomework, homework);
            }
        },
        [homework, sendToServer, tempHomework],
    );
    const forms = useMemo(() => ({
        information: {
            input: <TextInput
                multiline
                value={tempHomework.information}
                onChange={event => {
                    const value = event.target.value;
                    const data = update(
                        tempHomework,
                        {
                            information: {
                                $set: value,
                            },
                        },
                    );
                    setTempHomework(data);
                }} />,
            onEditModeLeft: sendToServerFn,
        },
        dueDate: {
            input:
                <MuiPickersUtilsProvider utils={DayjsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="dialog"
                        format="DD/MM/YYYY"
                        margin="normal"
                        value={tempHomework?.dueDate?.toDate()}
                        error={Boolean(errors.dueDate)}
                        onChange={date => {
                            if (date) {
                                const data = update(
                                    tempHomework,
                                    {
                                        dueDate: {
                                            $set: dayjs(date),
                                        },
                                    },
                                );
                                setTempHomework(data);
                            }
                        }}
                    />
                </MuiPickersUtilsProvider>,
            onEditModeLeft: sendToServerFn,
        },
        type: {
            input: <TextInput
                value={tempHomework.type}
                onChange={event => {
                    const value = event.target.value;
                    const data = update(
                        tempHomework,
                        {
                            type: {
                                $set: value,
                            },
                        },
                    );
                    setTempHomework(data);
                }} />,
            onEditModeLeft: sendToServerFn,
        },
    }), [errors.dueDate, sendToServerFn, setTempHomework, tempHomework]);

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (isError || !homework || !tempHomework) {
        return null;
    }

    console.log(errors, tempHomework.dueDate.format("L"));

    return (
        <DetailPage
            title={homework.lesson.lessonData.course.subject.name}
            color={homework.lesson.lessonData.course.subject.userRelation.color}
            defaultOrdering={[
                "information", "dueDate", "createdAt", "type", "lesson",
            ]}
            refetch={refetch}
            updatedAt={dayjs(updatedAt)}
            isRefreshing={isFetching}
            data={{
                information: {
                    icon: <FaInfoCircle />,
                    title: t("Information"),
                    information: tempHomework.information,
                },
                dueDate: {
                    icon: getDueDateIcon(tempHomework?.dueDate, homework.userRelation.ignore || homework.userRelation.completed),
                    title: t("Fälligkeitsdatum"),
                    information: tempHomework?.dueDate?.format("L"),
                },
                createdAt: {
                    icon: <FaClock />,
                    title: t("Einstellungsdatum"),
                    information: homework.createdAt.format("LT"),
                },
                type: {
                    icon: <BiBarChartSquare />,
                    title: t("Typ"),
                    information: tempHomework.type,
                },
                lesson: {
                    icon: <FaTable />,
                    title: t("Stunde"),
                    information: formatLesson(homework.lesson),
                },
            }}
            orderingStorageName="detail:ordering:homework_detail"
            forms={forms}
            forceEdit={[
                errors.dueDate && "dueDate",
            ]}
        />
    );
};

export default HomeworkPage;
