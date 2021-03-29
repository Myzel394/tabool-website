import React from "react";
import {FaGenderless, IoMdFemale, IoMdMale} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {Gender} from "api";

import {Information} from "../components";
import genderColor from "../../constants/genderColor";

export interface IGenderField {
    value: Gender;
    justIcon?: boolean;
    withColor?: boolean;
}

const ICON_GENDER_MAPPING = {
    [Gender.Male]: IoMdMale,
    [Gender.Female]: IoMdFemale,
    [Gender.Diverse]: FaGenderless,
};

const GenderStatus = ({
    value,
    justIcon,
    withColor,
}: IGenderField) => {
    const {t} = useTranslation();

    const Icon = ICON_GENDER_MAPPING[value];
    const text = {
        [Gender.Male]: t("Männlich"),
        [Gender.Female]: t("Weiblich"),
        [Gender.Diverse]: t("Divers"),
    }[value];

    return (
        <Information
            getIcon={props => <Icon {...props} color={withColor ? genderColor[value] : undefined} />}
            text={justIcon ? null : text}
        />
    );
};

export default GenderStatus;
