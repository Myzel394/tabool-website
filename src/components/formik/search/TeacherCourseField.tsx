import React from "react";
import {FieldProps} from "formik";
import {TeacherCourseDetail} from "types";
import {IFetchTeacherCourseResponse, useFetchTeacherCourseDetailAPI, useFetchTeacherCourseListAPI} from "hooks/apis";
import {Trans, useTranslation} from "react-i18next";
import {createFilterOptions} from "@material-ui/lab";
import dayjs from "dayjs";

import BaseSearchField, {DefaultListItemField} from "./BaseSearchField";

const filter = createFilterOptions<TeacherCourseDetail>();
const getLabel = (course: TeacherCourseDetail) => course.name;

const TeacherCourseField = (props: FieldProps) => {
    const {t} = useTranslation();
    const fetchCourses = useFetchTeacherCourseListAPI();
    const fetchCourseDetail = useFetchTeacherCourseDetailAPI();

    return (
        <BaseSearchField<TeacherCourseDetail, IFetchTeacherCourseResponse>
            {...props}
            fetchElements={(search, page) => fetchCourses({search}, page)}
            filterElements={(elements, search) =>
                filter(elements, {
                    inputValue: search,
                    getOptionLabel: getLabel,
                })
            }
            queryKey="teacher_courses"
            fetchSingleLabel={async (key) => {
                const course = await fetchCourseDetail(key);

                return getLabel(course);
            }}
            modalTitle={t("Kurs auswählen")}
            getOptionLabel={getLabel}
        >
            {(course, isSelected, onClick, isParentSelected) => (
                <DefaultListItemField
                    isParentSelected={isParentSelected}
                    isSelected={isSelected}
                    mainColor={course.subject.userRelation.color}
                    primary={course.name}
                    secondary={(() => {
                        const count = course.participantsCount;
                        const today = dayjs();
                        const weekdayAbbreviations = course.weekdays
                            .map(weekday => today.set("day", weekday).format("dd"))
                            .join(", ");

                        return (
                            <>
                                <Trans count={count}>
                                    {{count: course.participantsCount}}{" "}
                                    Schüler
                                </Trans>
                                {` | ${weekdayAbbreviations}`}
                            </>
                        );
                    })()}
                    onClick={onClick}
                />
            )}
        </BaseSearchField>
    );
};

export default TeacherCourseField;
