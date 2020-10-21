import React, {memo} from "react";
import {searchTeacher} from "api/schoolData";
import {useTranslation} from "react-i18next";
import {ListItem, ListItemText} from "@material-ui/core";
import {TeacherApprox} from "types/teachers";

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
    > & {
    onChange: (value: TeacherApprox) => void;
    value: TeacherApprox | undefined;
};

const TeacherField = ({onChange, value, ...other}: ITeacherField) => {
    const {t} = useTranslation();

    return (
        <BasicSearchField
            {...other}
            title={value?.lastName || t("Lehrer auswählen")}
            renderListElement={(element, props) =>
                <ListItem key={element.id} {...props} button>
                    <ListItemText primary={element.lastName} secondary={element.shortName} />
                </ListItem>
            }
            queryFunction={searchTeacher}
            queryKey="fetch_teachers"
            searchPlaceholder={t("Suche nach Nachnamen")}
            onSelect={element => onChange(element)}
        />
    );
};

export default memo(TeacherField);
