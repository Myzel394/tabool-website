import React, {memo, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {TeacherApprox} from "types";
import {useFetchTeacherListAPI} from "hooks/apis";
import {FaFemale, FaGenderless, FaMale} from "react-icons/all";
import {Avatar, ListItemAvatar} from "@material-ui/core";

import SimpleListField, {itemSize} from "../../inputs/SimpleListField";
import {Gender} from "../../../api";
import genderColor from "../../../constants/genderColor";

import BasicSearchField, {SearchFieldExtend} from "./BasicSearchField";

export type ITeacherField = SearchFieldExtend<TeacherApprox>;


const TeacherField = ({
    onChange,
    onBlur,
    ...other
}: ITeacherField) => {
    const {t} = useTranslation();

    const [selectedValue, setSelectedValue] = useState<TeacherApprox | null>();

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
        <BasicSearchField<TeacherApprox>
            {...other}
            searchPlaceholder={t("Suche nach Nachnamen")}
            title={title}
            renderListElement={((teacher, props, isSelected) => (
                <SimpleListField
                    listItemProps={{
                        button: true,
                        disableRipple: true,
                        disableTouchRipple: true,
                    }}
                    isActive={isSelected}
                    primaryText={teacher.lastName}
                    secondaryText={teacher.shortName}
                    left={
                        <ListItemAvatar>
                            <Avatar
                                style={{
                                    backgroundColor: genderColor[teacher.gender],
                                }}
                            >
                                {{
                                    [Gender.Male]: <FaMale />,
                                    [Gender.Female]: <FaFemale />,
                                    [Gender.Diverse]: <FaGenderless />,
                                    [Gender.Unknown]: null,
                                }[teacher.gender]}
                            </Avatar>
                        </ListItemAvatar>
                    }
                    {...props}
                />
            ))}
            queryFunction={queryFunction}
            queryKey="fetch_teachers"
            modalTitle={defaultTitle}
            filterData={filterFunc}
            listItemSize={itemSize}
            getKeyFromData={(element) => element.id}
            onSelect={setSelectedValue}
        />
    );
};

export default memo(TeacherField);
