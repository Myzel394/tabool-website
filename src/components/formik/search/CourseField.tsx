import React, {memo, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {CourseApprox} from "types";
import {useFetchCourseListAPI} from "hooks/apis";

import SimpleListField, {itemSize} from "../../inputs/SimpleListField";

import BasicSearchField, {SearchFieldExtend} from "./BasicSearchField";

export type ITeacherField = SearchFieldExtend<CourseApprox>;


const TeacherField = ({
    onChange,
    onBlur,
    ...other
}: ITeacherField) => {
    const {t} = useTranslation();

    const [selectedValue, setSelectedValue] = useState<CourseApprox | null>();

    const queryFunction = useFetchCourseListAPI();
    // Functions
    const filterFunc = useCallback((givenData: CourseApprox[], value: string) =>
        givenData.filter(element => {
            return element.subject.name.toLowerCase().includes(value) ||
                element.teacher.lastName.toLowerCase().includes(value);
        }), []);

    const defaultTitle = t("Kurs auswählen");
    const title = selectedValue ? selectedValue.name : defaultTitle;

    return (
        <BasicSearchField<CourseApprox>
            {...other}
            searchPlaceholder={t("Suche nach Kursen")}
            title={title}
            renderListElement={((course, props, isSelected) => (
                <SimpleListField
                    listItemProps={{
                        button: true,
                        disableRipple: true,
                        disableTouchRipple: true,
                    }}
                    isActive={isSelected}
                    primaryText={course.name}
                    secondaryText={course.teacher.lastName}
                    {...props}
                />
            ))}
            queryFunction={queryFunction}
            queryKey="fetch_courses"
            modalTitle={defaultTitle}
            filterData={filterFunc}
            listItemSize={itemSize}
            getKeyFromData={(element) => element.id}
            onSelect={setSelectedValue}
        />
    );
};

export default memo(TeacherField);
