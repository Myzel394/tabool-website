import React from "react";
import {useTranslation} from "react-i18next";
import {StudentCourseDetail} from "types";
import {IFetchStudentCourseResponse, useFetchStudentCourseDetailAPI, useFetchStudentCourseListAPI} from "hooks/apis";
import {createFilterOptions} from "@material-ui/lab";

import BaseSearchField, {DefaultListItemField} from "./BaseSearchField";

const filter = createFilterOptions<StudentCourseDetail>();
const getLabel = (course: StudentCourseDetail) => course.name;

const StudentCourseField = (props) => {
    const {t} = useTranslation();
    const fetchCourses = useFetchStudentCourseListAPI();
    const fetchCourseDetail = useFetchStudentCourseDetailAPI();

    return (
        <BaseSearchField<StudentCourseDetail, IFetchStudentCourseResponse>
            {...props}
            fetchElements={(search, page) => fetchCourses({search}, page)}
            filterElements={(elements, search) =>
                filter(elements, {
                    inputValue: search,
                    getOptionLabel: getLabel,
                })
            }
            queryKey="student_courses"
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
                    secondary={course.teacher.lastName}
                    onClick={onClick}
                />
            )}
        </BaseSearchField>
    );
};

export default StudentCourseField;
