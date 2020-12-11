import React, {memo} from "react";
import {Gender} from "types";
import {FaGenderless, FaQuestion, IoMdFemale, IoMdMale} from "react-icons/all";
import {useTranslation} from "react-i18next";

import Information from "./Information";

export interface IGenderField {
    value: Gender;
}

const ICON_GENDER_MAPPING = {
    [Gender.Male]: IoMdMale,
    [Gender.Female]: IoMdFemale,
    [Gender.Diverse]: FaGenderless,
    [Gender.Unknown]: FaQuestion,
};

const GenderStatus = ({value}: IGenderField) => {
    const {t} = useTranslation();

    const Icon = ICON_GENDER_MAPPING[value];
    const text = {
        [Gender.Male]: t("Männlich"),
        [Gender.Female]: t("Weiblich"),
        [Gender.Diverse]: t("Divers"),
        [Gender.Unknown]: t("Unbekannt"),
    }[value];

    return (
        <Information
            getIcon={props => <Icon {...props} />}
            text={text}
        />
    );
};

export default memo(GenderStatus);
