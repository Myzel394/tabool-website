import React, {memo, useCallback, useMemo} from "react";
import {searchTeacher} from "api/schoolData";
import {useTranslation} from "react-i18next";
import {TeacherApprox} from "types/teachers";

import BasicSearchField, {IBasicSearchField} from "./BasicSearchField";
import SimpleListField from "./SimpleListField";

export type ITeacherField = Omit<
    IBasicSearchField,
    "title"
    | "renderListElement"
    | "queryFunction"
    | "queryKey"
    | "searchPlaceholder"
    | "onSelect"
    | "searchParam"
    | "extractData"
    | "filterData"
    | "modalTitle"
    | "getKeyFromData"
    > & {
    onChange: (value: TeacherApprox) => void;
    value: TeacherApprox | undefined;
};

const itemSize = 48 + 2 * 6 * 2;


const TeacherField = ({onChange, value, ...other}: ITeacherField) => {
    const {t} = useTranslation();
    const defaultTitle = useMemo(() => t("Lehrer auswählen"), []);
    const title = value ? `${value.lastName} (${value.shortName})` : defaultTitle;
    const filterFunc = useCallback((givenData: TeacherApprox[], value: string) =>
        givenData.filter(element => {
            return element.lastName.toLocaleLowerCase().includes(value) ||
                element.shortName.toLocaleLowerCase().includes(value);
        }), []);
    const renderElement = useCallback((element: TeacherApprox, props, isSelected) => {
        return (
            <SimpleListField
                isActive={isSelected}
                primaryText={element.lastName}
                secondaryText={element.shortName}
                {...props}
            />);
    }, []);

    return (
        <BasicSearchField
            {...other}
            searchPlaceholder={t("Suche nach Nachnamen")}
            title={title}
            renderListElement={renderElement}
            queryFunction={searchTeacher}
            queryKey="fetch_teachers"
            modalTitle={defaultTitle}
            filterData={filterFunc}
            listItemSize={itemSize}
            getKeyFromData={(element: TeacherApprox) => element.id}
            value={value}
            onSelect={(element: TeacherApprox) => onChange(element)}
        />
    );
};

export default memo(TeacherField);
