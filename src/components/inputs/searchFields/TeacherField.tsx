import React, {memo, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {TeacherApprox} from "types/teacher";
import {IFetchTeacherResponse, useFetchTeacherListAPI} from "hooks/apis/fetch";

import SimpleListField, {itemSize} from "../SimpleListField";

import BasicSearchField, {SearchFieldExtend} from "./BasicSearchField";

export type ITeacherField = SearchFieldExtend<TeacherApprox>;


const TeacherField = ({onChange, selectedValue, ...other}: ITeacherField) => {
    const {t} = useTranslation();

    const queryFunction = useFetchTeacherListAPI();
    // Functions
    const filterFunc = useCallback((givenData: TeacherApprox[], value: string) =>
        givenData.filter(element => {
            return element.lastName.toLocaleLowerCase().includes(value) ||
                element.shortName.toLocaleLowerCase().includes(value);
        }), []);

    const defaultTitle = t("Lehrer auswählen");
    const title = selectedValue ? `${selectedValue.lastName} (${selectedValue.shortName})` : defaultTitle;

    return (
        <BasicSearchField<TeacherApprox, string, IFetchTeacherResponse>
            {...other}
            searchPlaceholder={t("Suche nach Nachnamen")}
            title={title}
            renderListElement={((element, props, isSelected) => (
                <SimpleListField
                    listItemProps={{
                        button: true,
                        disableRipple: true,
                        disableTouchRipple: true,
                    }}
                    isActive={isSelected}
                    primaryText={element.lastName}
                    secondaryText={element.shortName}
                    {...props}
                />
            ))}
            queryFunction={queryFunction}
            queryKey="fetch_teachers"
            modalTitle={defaultTitle}
            filterData={filterFunc}
            listItemSize={itemSize}
            getKeyFromData={(element) => element.id}
            selectedValue={selectedValue}
            onSelect={onChange}
        />
    );
};

export default memo(TeacherField);
