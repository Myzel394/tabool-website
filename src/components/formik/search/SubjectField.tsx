import React from "react";
import {useTranslation} from "react-i18next";
import {Subject} from "types";
import {IFetchSubjectResponse, useFetchSubjectDetailAPI, useFetchSubjectListAPI} from "hooks/apis";
import {createFilterOptions} from "@material-ui/lab";

import BaseSearchField, {DefaultListItemField} from "./BaseSearchField";

const filter = createFilterOptions<Subject>();
const getLabel = (subject: Subject) => subject.name;

const SubjectField = (props) => {
    const {t} = useTranslation();
    const fetchSubjects = useFetchSubjectListAPI();
    const fetchSubjectDetail = useFetchSubjectDetailAPI();

    return (
        <BaseSearchField<Subject, IFetchSubjectResponse>
            {...props}
            fetchElements={(search, page) => fetchSubjects({search}, page)}
            filterElements={(elements, search) =>
                filter(elements, {
                    inputValue: search,
                    getOptionLabel: getLabel,
                })
            }
            queryKey="subjects"
            fetchSingleLabel={async (key) => {
                const subject = await fetchSubjectDetail(key);

                return getLabel(subject);
            }}
            modalTitle={t("Fach auswählen")}
            getOptionLabel={getLabel}
        >
            {(subject, isSelected, onClick, isParentSelected) => (
                <DefaultListItemField
                    isParentSelected={isParentSelected}
                    isSelected={isSelected}
                    mainColor={subject.userRelation.color}
                    primary={`${subject.name}`}
                    secondary={`${subject.shortName}`}
                    onClick={onClick}
                />
            )}
        </BaseSearchField>
    );
};

export default SubjectField;
