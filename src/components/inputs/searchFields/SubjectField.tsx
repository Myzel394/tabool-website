import React, {memo, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {IFetchSubjectResponse, useFetchSubjectListAPI} from "hooks";
import {Subject} from "types";

import SimpleListField, {itemSize} from "../SimpleListField";

import BasicSearchField, {SearchFieldExtend} from "./BasicSearchField";

export type ISubjectField = SearchFieldExtend<Subject>;


const SubjectField = ({onChange, selectedValue, ...other}: ISubjectField) => {
    const {t} = useTranslation();

    const queryFunction = useFetchSubjectListAPI();
    // Functions
    const filterFunc = useCallback((givenData: Subject[], value: string) =>
        givenData.filter(element => {
            return element.name.toLocaleLowerCase().includes(value) ||
                element.shortName.toLocaleLowerCase().includes(value);
        }), []);

    const defaultTitle = t("Fach auswählen");
    const title = selectedValue ? `${selectedValue.name} (${selectedValue.shortName})` : defaultTitle;

    return (
        <BasicSearchField<Subject, string, IFetchSubjectResponse>
            {...other}
            searchPlaceholder={t("Suche nach Nachnamen")}
            title={title}
            renderListElement={(element, props, isSelected) => (
                <SimpleListField
                    listItemProps={{
                        button: true,
                        disableRipple: true,
                        disableTouchRipple: true,
                    }}
                    isActive={isSelected}
                    primaryText={element.name}
                    secondaryText={element.shortName}
                    {...props}
                />)
            }
            queryFunction={queryFunction}
            queryKey="fetch_subjects"
            modalTitle={defaultTitle}
            filterData={filterFunc}
            listItemSize={itemSize}
            getKeyFromData={(element) => element.id}
            selectedValue={selectedValue}
            onSelect={onChange}
        />
    );
};

export default memo(SubjectField);
