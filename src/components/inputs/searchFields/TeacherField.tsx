import React, {memo, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {TeacherApprox} from "types/teacher";
import {useFetchTeacherListAPI} from "hooks/apis/schoolData";

import SimpleListField, {itemSize} from "../SimpleListField";

import BasicSearchField, {IBasicSearchField} from "./BasicSearchField";

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


const TeacherField = ({onChange, value, ...other}: ITeacherField) => {
    const {t} = useTranslation();

    const queryFunction = useFetchTeacherListAPI();
    // Functions
    const filterFunc = useCallback((givenData: TeacherApprox[], value: string) =>
        givenData.filter(element => {
            return element.lastName.toLocaleLowerCase().includes(value) ||
                element.shortName.toLocaleLowerCase().includes(value);
        }), []);
    const renderElement = useCallback((element: TeacherApprox, props, isSelected) => {
        return (
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
            />);
    }, []);

    const defaultTitle = t("Lehrer auswählen");
    const title = value ? `${value.lastName} (${value.shortName})` : defaultTitle;

    return (
        <BasicSearchField
            {...other}
            searchPlaceholder={t("Suche nach Nachnamen")}
            title={title}
            renderListElement={renderElement}
            queryFunction={queryFunction}
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
