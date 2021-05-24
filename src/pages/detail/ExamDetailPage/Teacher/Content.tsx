import React from "react";
import {FaClock, MdInfo, MdTitle, MdToday} from "react-icons/all";
import {Field} from "formik";
import {TextField} from "formik-material-ui";
import {Dayjs} from "dayjs";
import {Button, Grid, Link} from "@material-ui/core";
import {QueryObserverBaseResult, UseMutateAsyncFunction} from "react-query";
import {AxiosError} from "axios";
import {useTranslation} from "react-i18next";
import {CourseIcon, DetailPage, renderDayWithLessonWeekdays} from "components";
import {TeacherExamDetail} from "types";
import {buildPath} from "utils";
import {IUpdateTeacherExamData} from "hooks/apis";
import {DatePicker} from "formik-material-ui-pickers";

import ExtraActions from "./ExtraActions";


export interface ContentProps {
    exam: TeacherExamDetail;

    isFetching: boolean;

    dataUpdatedAt: Dayjs;

    update: UseMutateAsyncFunction<TeacherExamDetail, AxiosError, IUpdateTeacherExamData>;
    refetch: QueryObserverBaseResult<TeacherExamDetail, AxiosError>["refetch"];
}

type ExamKeys = "title" | "information" | "date" | "course" | "createdAt";

const Content = ({
    exam,
    dataUpdatedAt,
    isFetching,
    refetch,
    update,
}: ContentProps) => {
    const {t} = useTranslation();

    const renderDay = renderDayWithLessonWeekdays(exam.course.weekdays, exam.course.subject.userRelation.color);

    return (
        <DetailPage<ExamKeys, "", TeacherExamDetail>
            color={exam.course.subject.userRelation.color}
            orderingStorageName="teacher-exam"
            defaultOrdering={[
                "title", "information", "date", "course", "createdAt",
            ]}
            isRefreshing={isFetching}
            renderTopField={reorderElement => (
                <>
                    <Grid item>
                        {reorderElement}
                    </Grid>
                    <Grid item>
                        <ExtraActions id={exam.id} />
                    </Grid>
                </>
            )}
            data={{
                title: {
                    title: t("Titel"),
                    information: exam.title,
                    disableShowMore: true,
                    icon: <MdTitle />,
                    renderField({getFieldProps}) {
                        return (
                            <Field
                                {...getFieldProps("title")}
                                fullWidth
                                variant="outlined"
                                component={TextField}
                            />
                        );
                    },
                },
                information: {
                    title: t("Informationen"),
                    information: exam.information,
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
                date: {
                    title: t("Datum"),
                    helperText: t("Der Tag, an dem die Arbeit geschrieben wird"),
                    information: exam.date.format("LL"),
                    nativeValue: exam.date,
                    isEqual: (oldValue: Dayjs, newValue: Dayjs) => oldValue?.isSame?.(newValue),
                    disableShowMore: true,
                    icon: <MdToday />,
                    renderField({getFieldProps, setFieldValue}) {
                        return (
                            <Field
                                {...getFieldProps("date")}
                                disablePast
                                renderDay={renderDay}
                                inputVariant="outlined"
                                ampm={false}
                                format="LL"
                                component={DatePicker}
                                onChange={newDate => setFieldValue("date", newDate)}
                            />
                        );
                    },
                },
                course: {
                    icon: <CourseIcon />,
                    title: t("Kurs"),
                    information: exam.course.name,
                    disableShowMore: true,
                    helperText: (
                        <Link
                            underline="none"
                            component={Button}
                            href={buildPath("/agenda/course/detail/:id/", {
                                id: exam.course.id,
                            })}
                        >
                            {t("Zum Kurs")}
                        </Link>
                    ),
                },
                createdAt: {
                    icon: <FaClock />,
                    title: t("Einstellungsdatum"),
                    information: exam.createdAt.format("LLL"),
                    disableShowMore: true,
                },
            }}
            title={exam.title}
            updatedAt={dataUpdatedAt}
            onRefetch={refetch}
            onSubmit={(values, {setErrors, setSubmitting}) =>
                update(values)
                    .then(update)
                    .catch((error) => setErrors(error.response?.data))
                    .finally(() => setSubmitting(false))
            }
        />
    );
};
export default Content;

