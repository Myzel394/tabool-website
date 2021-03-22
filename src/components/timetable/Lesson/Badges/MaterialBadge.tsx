import React from "react";
import {useTranslation} from "react-i18next";
import {HiDocument} from "react-icons/all";

import LessonBadge from "../LessonBadge";

export interface IMaterialBadge {
    count: number;
}

const MaterialBadge = ({count}: IMaterialBadge) => {
    const {t} = useTranslation();

    return (
        <LessonBadge
            description={t("{{count}} Materialien verfügbar", {
                count,
            })}
            getIcon={props => <HiDocument {...props} />}
        />
    );
};

export default MaterialBadge;
