import React from "react";
import {StudentHomeworkDetail} from "types";
import {
    BooleanStatus,
    DetailPage,
    HomeworkDueDateField,
    HomeworkTypeField,
    LessonIcon,
    renderDayWithLessonWeekdays,
} from "components";
import {Alert} from "@material-ui/lab";
import {
    IUpdateHomeworkUserRelationData,
    IUpdateHomeworkUserRelationResponse,
    IUpdateStudentHomeworkData,
} from "hooks/apis";
import {BiBarChartSquare, FaClock, MdBlock, MdCheck, MdInfo, MdLock, MdLockOpen} from "react-icons/all";
import {Dayjs} from "dayjs";
import {buildPath, lazyDatetime} from "utils";
import {Button, Grid, Link, makeStyles} from "@material-ui/core";
import {Field} from "formik";
import {TextField} from "formik-material-ui";
import {useTranslation} from "react-i18next/src";
import {AxiosError} from "axios";
import {QueryObserverBaseResult, UseMutateAsyncFunction} from "react-query";

import getDueDateIcon from "../getDueDateIcon";

import useSchema from "./useSchema";
import ExtraActions from "./ExtraActions";

type HomeworkKeys = "information" | "type" | "dueDate" | "createdAt" | "isPrivate" | "lesson";

export interface ContentProps {
    homework: StudentHomeworkDetail;

    isFetching: boolean;

    dataUpdatedAt: Dayjs;

    update: UseMutateAsyncFunction<StudentHomeworkDetail, AxiosError, IUpdateStudentHomeworkData>;
    updateRelation: UseMutateAsyncFunction<IUpdateHomeworkUserRelationResponse, AxiosError, IUpdateHomeworkUserRelationData>;
    refetch: QueryObserverBaseResult<StudentHomeworkDetail, AxiosError>["refetch"];
}

const useClasses = makeStyles(theme => ({
    alert: {
        position: "sticky",
        left: 0,
        top: 0,
        zIndex: theme.zIndex.tooltip - 1,
    },
}));

const Content = ({
    homework,
    dataUpdatedAt,
    isFetching,
    refetch,
    update,
    updateRelation,
}: ContentProps) => {
    const {t} = useTranslation();
    const schema = useSchema();
    const classes = useClasses();

    const canEditHomework = homework.isPrivate;

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
                        updateRelation(data)
                            .catch(resetForm)
                            .finally(() => setSubmitting(false)),
                }}
                updatedAt={dataUpdatedAt}
                color={homework.lesson.course.subject.userRelation.color}
                orderingStorageName="student-homework"
                addPath={buildPath("/add/homework/", undefined, {
                    lessonId: homework.lesson.id,
                    lessonDate: lazyDatetime(homework.lessonDate, "date"),
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
                            <ExtraActions id={homework.id} allow={Boolean(canEditHomework)} />
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
                            <HomeworkDueDateField
                                {...getFieldProps("dueDate")}
                                renderDay={renderDueDateDay}
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
                    update(values)
                        .catch((error) => setErrors(error.response?.data))
                        .finally(() => setSubmitting(false))
                }
            />
        </>
    );
};

export default Content;
