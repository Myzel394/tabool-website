import React, {memo, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {Subject} from "types";
import {useTheme} from "@material-ui/core";
import tinycolor from "tinycolor2";
import {useFetchSubjectListAPI} from "hooks/apis";

import SimpleListField, {itemSize} from "../../inputs/SimpleListField";

import BasicSearchField, {SearchFieldExtend} from "./BasicSearchField";

export type ISubjectField = SearchFieldExtend<Subject>;


const SubjectField = (props: ISubjectField) => {
    const {t} = useTranslation();
    const theme = useTheme();

    const [selectedValue, setSelectedValue] = useState<Subject | null>();

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
        <BasicSearchField<Subject, string>
            {...props}
            searchPlaceholder={t("Suche nach Fächern")}
            title={title}
            renderListElement={(element, {style, ...other}, isSelected) => (
                <SimpleListField
                    listItemProps={{
                        button: true,
                        disableRipple: true,
                        disableTouchRipple: true,
                    }}
                    isActive={isSelected}
                    primaryText={element.name}
                    secondaryText={element.shortName}
                    style={{
                        ...style,
                        ...(isSelected ? {
                            backgroundColor: tinycolor(element.userRelation.color).setAlpha(theme.palette.action.activatedOpacity).toString(),
                        } : {}),
                    }}
                    {...other}
                />)
            }
            queryFunction={queryFunction}
            queryKey="fetch_subjects"
            modalTitle={defaultTitle}
            filterData={filterFunc}
            listItemSize={itemSize}
            getKeyFromData={(element) => element.id}
            onSelect={setSelectedValue}
        />
    );
};

export default memo(SubjectField);
