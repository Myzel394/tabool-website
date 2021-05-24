import React from "react";
import {useTranslation} from "react-i18next";
import {FaClipboardList} from "react-icons/all";

import LessonBadge from "../LessonBadge";

export interface HomeworkBadgeProps {
    count: number;
}

const HomeworkBadge = ({count}: HomeworkBadgeProps) => {
    const {t} = useTranslation();

    return (
        <LessonBadge
            description={t("{{count}} Hausaufgaben verfügbar", {
                count,
            })}
            getIcon={props => <FaClipboardList {...props} />}
        />
    );
};

export default HomeworkBadge;
