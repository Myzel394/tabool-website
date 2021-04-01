import genderColor from "constants/genderColor";

import React from "react";
import {IFetchTeacherResponse, useFetchTeacherDetailAPI, useFetchTeacherListAPI} from "hooks/apis";
import {useTranslation} from "react-i18next";
import {TeacherDetail} from "types";
import {createFilterOptions} from "@material-ui/lab";


import BaseSearchField, {DefaultListItemField} from "./BaseSearchField";

const filter = createFilterOptions<TeacherDetail>();
const getLabel = (teacher: TeacherDetail) => `${teacher.firstName} ${teacher.lastName}`;

const TeacherField = (props) => {
    const {t} = useTranslation();
    const fetchTeachers = useFetchTeacherListAPI();
    const fetchTeacherDetail = useFetchTeacherDetailAPI();

    return (
        <BaseSearchField<TeacherDetail, IFetchTeacherResponse>
            {...props}
            fetchElements={(search, page) => fetchTeachers({search}, page)}
            filterElements={(elements, search) =>
                filter(elements, {
                    inputValue: search,
                    getOptionLabel: getLabel,
                })
            }
            queryKey="teachers"
            fetchSingleLabel={async (key) => {
                const teacher = await fetchTeacherDetail(key);

                return getLabel(teacher);
            }}
            modalTitle={t("Lehrer auswählen")}
            getOptionLabel={getLabel}
        >
            {(teacher, isSelected, onClick, isParentSelected) => (
                <DefaultListItemField
                    isParentSelected={isParentSelected}
                    isSelected={isSelected}
                    primary={`${teacher.lastName}`}
                    secondary={`${teacher.shortName}`}
                    mainColor={genderColor[teacher.gender]}
                    onClick={onClick}
                />
            )}
        </BaseSearchField>
    );
};

export default TeacherField;
