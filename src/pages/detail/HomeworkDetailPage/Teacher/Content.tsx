import React, {Dispatch, SetStateAction} from "react";
import {TeacherHomeworkDetail} from "types";
import {Dayjs} from "dayjs";
import {QueryObserverBaseResult, UseMutateAsyncFunction} from "react-query";
import {AxiosError} from "axios";
import {IUpdateTeacherHomeworkData} from "hooks/apis";
import {
    DetailPage,
    GenderStatus,
    HomeworkDueDateField,
    HomeworkTypeField,
    LessonIcon,
    renderDayWithLessonWeekdays,
} from "components";
import {buildPath, lazyDatetime} from "utils";
import {BiBarChartSquare, FaClock, MdInfo, MdLock, MdLockOpen} from "react-icons/all";
import {Field} from "formik";
import {TextField} from "formik-material-ui";
import {useTranslation} from "react-i18next/src";
import {Box, Button, Grid, Link} from "@material-ui/core";

import getDueDateIcon from "../getDueDateIcon";

import useSchema from "./useSchema";
import ExtraActions from "./ExtraActions";


type HomeworkKeys = "information" | "type" | "dueDate" | "createdAt" | "lesson" | "privateToStudent";

export interface ContentProps {
    homework: TeacherHomeworkDetail;
    updateHomework: Dispatch<SetStateAction<TeacherHomeworkDetail>>;

    isFetching: boolean;

    dataUpdatedAt: Dayjs;

    update: UseMutateAsyncFunction<TeacherHomeworkDetail, AxiosError, IUpdateTeacherHomeworkData>;
    refetch: QueryObserverBaseResult<TeacherHomeworkDetail, AxiosError>["refetch"];
}

const Content = ({
    updateHomework,
    update,
    refetch,
    isFetching,
    dataUpdatedAt,
    homework,
}: ContentProps) => {
    const {t} = useTranslation();
    const schema = useSchema();

    const renderDueDateDay = renderDayWithLessonWeekdays(
        homework.lesson.course.weekdays,
        homework.lesson.course.subject.userRelation.color,
    );

    return (
        <DetailPage<HomeworkKeys, "", IUpdateTeacherHomeworkData, TeacherHomeworkDetail>
            isRefreshing={isFetching}
            validationSchema={schema}
            title={homework.lesson.course.subject.name}
            defaultOrdering={[
                "privateToStudent", "information", "dueDate", "type", "createdAt", "lesson",
            ]}
            updatedAt={dataUpdatedAt}
            color={homework.lesson.course.subject.userRelation.color}
            orderingStorageName="teacher-homework"
            addPath={buildPath("/add/homework/", undefined, {
                lessonId: homework.lesson.id,
                lessonDate: lazyDatetime(homework.lessonDate, "date"),
                type: homework.type,
                dueDate: lazyDatetime(homework.dueDate),
            })}
            renderTopField={reorderElement => (
                <>
                    <Grid item>
                        {reorderElement}
                    </Grid>
                    <Grid item>
                        <ExtraActions id={homework.id} />
                    </Grid>
                </>
            )}
            data={{
                privateToStudent: {
                    disableShowMore: true,
                    title: t("Privat"),
                    icon: homework.isPrivate ? <MdLock /> : <MdLockOpen />,
                    information: homework.isPrivate ? (
                        <Box display="flex" alignItems="center">
                            <GenderStatus justIcon withColor value={homework.privateToStudent.gender} />
                            {/* eslint-disable-next-line @shopify/jsx-no-hardcoded-content */}
                            <Box ml={1}>
                                {`${homework.privateToStudent.firstName} ${homework.privateToStudent.lastName}`}
                            </Box>
                        </Box>
                    ) : t("Öffentlich"),
                },
                information: {
                    information: homework.information,
                    title: t("Information"),
                    icon: <MdInfo />,
                    renderField({getFieldProps}) {
                        return (
                            <Field
                                {...getFieldProps("information")}
                                fullWidth
                                multiline
                                variant="outlined"
                                component={TextField}
                            />
                        );
                    },
                },
                dueDate: {
                    icon: (dueDate: Dayjs) =>
                        (dueDate ? getDueDateIcon(
                            dueDate,
                            Boolean(homework.dueDate && dueDate.isSame(homework.dueDate)),
                        ) : null),
                    title: t("Fälligkeitsdatum"),
                    nativeValue: homework.dueDate,
                    information: homework.dueDate?.format("LLL"),
                    isEqual: (oldValue: Dayjs, newValue: Dayjs) => oldValue?.isSame?.(newValue),
                    disableShowMore: true,
                    renderField({getFieldProps, setFieldValue}) {
                        return (
                            <HomeworkDueDateField
                                {...getFieldProps("dueDate")}
                                renderDay={renderDueDateDay}
                                onChange={date => setFieldValue("dueDate", date)}
                            />
                        );
                    },
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
                type: {
                    icon: <BiBarChartSquare />,
                    title: t("Typ"),
                    information: homework.type ?? "",
                    disableShowMore: true,
                    renderField({getFieldProps}) {
                        return (
                            <Field
                                {...getFieldProps("type")}
                                type="text"
                                component={HomeworkTypeField}
                            />
                        );
                    },
                },
            }}
            onRefetch={refetch}
            onSubmit={(values, {setErrors, setSubmitting}) =>
                update(values)
                    .then(updateHomework)
                    .catch((error) => setErrors(error.response?.data))
                    .finally(() => setSubmitting(false))
            }
        />
    );
};
export default Content;

